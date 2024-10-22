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
    } = req.body;

    const objetoPort = {
      port: ports && ports[0] && ports[0].port ? ports[0].port : 3000,
      as: ports && ports[0] && ports[0].as ? ports[0].as : 80,
    };
    let comando = "";
    let argumento = "";

    if (commands && typeof commands === "object") {
      const [primerComando] = Object.entries(commands);
      if (primerComando) {
        [comando, argumento] = primerComando;
      }
    }

    const yamlStructure = {
      version: "2.0",
      services: {
        [serviceName]: {
          image: image,
          expose: [
            {
              port: objetoPort.port,
              as: objetoPort.as,
              accept: Object.entries(ports[0].urls).map(
                ([key, value]) => `${value}`
              ),
              to: [{ global: true }],
            },
          ],
          command: [comando],
          args: [argumento],
          env: Object.entries(env).map(([key, value]) => `${key}=${value}`),
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
                amount: 10000,
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

    const API_URL = process.env.GRID_API;
    console.log(yamlString);
    const akashResponse = await fetch(`${API_URL}/akash/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: yamlString,
    });

    if (!akashResponse.ok) {
      console.log(akashResponse);
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