export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_URL = "https://git-app-dev.ongrid.run/repos/getList";

  try {
    const { installationId } = req.query;

    if (!installationId) {
      return res.status(400).json({ error: "Installation ID is required" });
    }

    const response = await fetch(
      `${API_URL}?installationId=${installationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching repositories: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
}