export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Repository ID is required" });
  }

  const GIT_API_PROVIDER = process.env.GIT_API_PROVIDER; // Configura esta variable en tu entorno
  const url = `https://git-app-dev.ongrid.run/api/repositories/${id}/branches`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching branches: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ error: "Failed to fetch branches" });
  }
}
