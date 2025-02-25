import yaml from "js-yaml";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
 

    const {
      serviceName,
      cpu,
      memory,
      ephemeralStorage,
      serviceCount,
      image,
      ports,
      storageUnit,
      memoryUnit,
      commands,
      env,
      accessToken,
    } = req.body;

    // const objetoPort = {
    //   port: ports && ports[0] && ports[0].port ? ports[0].port : 3000,
    //   as: ports && ports[0] && ports[0].as ? ports[0].as : 80,
    // };
    let command = commands && commands.length > 0 ? commands[0] : "";
    let args = commands && commands.length > 1 ? [commands[1]] : "";

    if (commands && typeof commands === "object") {
      const [primerComando] = Object.entries(commands);
      if (primerComando) {
        [command, args] = primerComando;
      }
    }

    const yamlStructure = {
      version: "2.0",
      services: {
        [serviceName]: {
          image: image,
          expose: [
            {
              port: ports.port,
              as: ports.as,
              // accept: Array.isArray(ports.accept) ? ports.accept : [],
              to: [{ global: true }],
            },
          ],
          // command: "",
          // args: "",
          // env: Object.entries(env).map(([key, value]) => `${key}=${value}`),
        },
      },
      profiles: {
        compute: {
          [serviceName]: {
            resources: {
              cpu: {
                units: parseFloat(cpu),
              },
              memory: {
                size: `${memory}${memoryUnit}`,
              },
              storage: {
                size: `${ephemeralStorage}${storageUnit}`,
              },
            },
          },
        },
        placement: {
          dcloud: {
            pricing: {
              [serviceName]: {
                denom: "uakt",
                amount: 50000,
              },
            },
          },
        },
      },
      deployment: {
        [serviceName]: {
          dcloud: {
            profile: serviceName,
            count: serviceCount,
          },
        },
      },
    };

    const yamlString = yaml.dump(yamlStructure);
    console.log(req.headers.authorization);
    const API_URL = process.env.GRID_API;

    const akashResponse = await fetch(`${API_URL}/akash`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Authorization: req.headers.authorization,
      },
      body: yamlString,
    });

    const responseText = await akashResponse.text();

    if (!akashResponse.ok) {
      throw new Error(
        `Akash API Error: ${akashResponse.status} ${akashResponse.statusText}`
      );
    }
    // Parse the text to JSON if needed
    let akashResult;
    try {
      akashResult = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
    }
    res.status(200).json(responseText);
  } catch (error) {
    console.error("Full error details:", error);
    res
      .status(500)
      .json({ message: "Error deploying to Akash", error: error.message });
  }
}