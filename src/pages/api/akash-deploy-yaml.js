import yaml from "js-yaml";
import { v4 as uuidv4 } from "uuid";

function addConsistentUuidToKeys(obj) {
  const uuidMap = new Map();

  function generateOrGetUuid(key) {
    if (!uuidMap.has(key)) {
      uuidMap.set(key, uuidv4());
    }
    return uuidMap.get(key);
  }

  function processObject(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(processObject);
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (["services", "compute", "pricing", "deployment"].includes(key)) {
        const newValue = {};
        for (const [subKey, subValue] of Object.entries(value)) {
          const uuid = generateOrGetUuid(subKey);
          const newKey = `${subKey}-${uuid}`;
          newValue[newKey] = processObject(subValue);
        }
        result[key] = newValue;
      } else if (key === "profile") {
        // Handle the profile field
        const uuid = generateOrGetUuid(value);
        result[key] = `${value}-${uuid}`;
      } else {
        result[key] = processObject(value);
      }
    }
    return result;
  }

  return processObject(obj);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { yamlContent } = req.body;

    // Parse the YAML to ensure it's valid
    let parsedYaml = yaml.load(yamlContent);

    // Add consistent UUIDs to specified keys
    parsedYaml = addConsistentUuidToKeys(parsedYaml);

    // Convert the modified object back to YAML
    const modifiedYamlContent = yaml.dump(parsedYaml);

    const API_URL = process.env.GRID_API;
    const akashResponse = await fetch(`${API_URL}/akash/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: modifiedYamlContent,
    });

    if (!akashResponse.ok) {
      throw new Error(
        `Akash API Error: ${akashResponse.status} ${akashResponse.statusText}`
      );
    }

    const akashResult = await akashResponse.json();
    console.log(akashResult);

    res.status(200).json(akashResult);
  } catch (error) {
    console.error("Error deploying to Akash:", error);
    res
      .status(500)
      .json({ message: "Error deploying to Akash", error: error.message });
  }
}
