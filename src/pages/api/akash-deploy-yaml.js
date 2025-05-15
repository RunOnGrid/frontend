export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  ("esta llegando aca");
  try {
    const { yamlContent } = req.body;
    const API_URL = process.env.GRID_API;

    const akashResponse = await fetch(`${API_URL}/akash/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: yamlContent,
    });

    if (!akashResponse.ok) {
      throw new Error(
        `Akash API Error: ${akashResponse.status} ${akashResponse.statusText}`
      );
    }

    const akashResult = await akashResponse.json();

    res.status(200).json(akashResult);
  } catch (error) {
    console.error("Error deploying to Akashaaaaa:", error);
    res
      .status(500)
      .json({ message: "Error deploying to Akash", error: error.message });
  }
}
