export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_URL = process.env.GRID_API;
  const { username } = req.query; // Obtener parámetros de consulta desde la URL
  const accessToken = req.headers.authorization?.split(" ")[1]; // Extraer el token del encabezado

  if (!username || !accessToken) {
    return res.status(400).json({ error: "Username or access token missing" });
  }

  try {
    const response = await fetch(
      `${API_URL}/deployments?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching deployments:", error);
    res.status(500).json({ error: "Failed to fetch deployments" });
  }
}
