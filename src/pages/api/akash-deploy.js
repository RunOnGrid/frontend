import yaml from "js-yaml";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { serviceName, cpu, memory, ephemeralStorage, serviceCount } =
      req.body;

    const yamlStructure = {
      version: "2.0",
      services: {
        [serviceName || "web"]: {
          image: "gridcloud/hello-app:2.0",
          expose: [
            {
              port: 8080,
              as: 80,
              to: [{ global: true }],
            },
          ],
        },
      },
      profiles: {
        compute: {
          [serviceName || "web"]: {
            resources: {
              cpu: {
                units: cpu,
              },
              memory: {
                size: `${memory}Mi`,
              },
              storage: {
                size: `${ephemeralStorage}Mi`,
              },
            },
          },
        },
        placement: {
          dcloud: {
            pricing: {
              [serviceName || "web"]: {
                denom: "uakt",
                amount: 1000,
              },
            },
          },
        },
      },
      deployment: {
        [serviceName || "web"]: {
          dcloud: {
            profile: serviceName || "web",
            count: serviceCount,
          },
        },
      },
    };

    const yamlString = yaml.dump(yamlStructure);

    const API_URL = process.env.GRID_API;
    console.log(API_URL);
    const akashResponse = await fetch(`${API_URL}/akash/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: yamlString,
    });

    if (!akashResponse.ok) {
      throw new Error(
        `Akash API Error: ${akashResponse.status} ${akashResponse.statusText}`
      );
    }

    const akashResult = await akashResponse.json();

    res.status(200).json(akashResult);
  } catch (error) {
    console.error("Error deploying to Akash:", error);
    res
      .status(500)
      .json({ message: "Error deploying to Akash", error: error.message });
  }
}
