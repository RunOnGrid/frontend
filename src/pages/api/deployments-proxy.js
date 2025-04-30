export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const API_URL = process.env.GRID_API;
  
    try {
      const response = await fetch(`${API_URL}/deployments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching repositories: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      res.status(500).json({ error: "Failed to fetch repositories" });
    }
  }