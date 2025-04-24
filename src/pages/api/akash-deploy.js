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
    storageUnit,
    memoryUnit,
    commands,
    envs,
    pat,
    owner,
    host,
    protocol,
    port,
    as,
  } = req.body;

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
        credentials: {
          host: host,
          username: owner,
          password: pat,
        },
        expose: [
          {
            port: parseFloat(port),
            as: parseFloat(as),
            // accept: Array.isArray(ports.accept) ? ports.accept : [],
            proto: protocol,
            to: [{ global: true }],
          },
        ],
        // command: "",
        // args: "",
        env: envs,
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
              size: `${memory}Mi`,
            },
            storage: {
              size: `${ephemeralStorage}gb`,
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
  console.log("YAML String:", yamlString);
  const API_URL = process.env.GRID_API;

  // const akashResponse = await fetch(`${API_URL}/akash`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "text/plain",
  //     Authorization: req.headers.authorization,
  //   },
  //   body: yamlString,
  // });

  // const responseText = await akashResponse.text();

  // if (!akashResponse.ok) {
  //   throw new Error(
  //     `Akash API Error: ${akashResponse.status} ${akashResponse.statusText}`
  //   );
  // }

  let akashResult;
  try {
    console.log("llego try");
    // akashResult = JSON.parse(responseText);
  } catch (e) {
    console.error("Failed to parse response as JSON:", e);
  }

  res.status(200);
} catch (error) {
  console.error("Full error details:", error);
  res
    .status(500)
    .json({ message: "Error deploying to Akash", error: error.message });
}
}