export default async function handler(req, res) {
  const API_URL = process.env.GRID_API;

  if (req.method === "POST") {
    try {
      // Extract the login data from the request body
      const { username, password } = req.body;

      // Forward the login request to the external API
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Respond to the client with the data from the external API
        res.status(200).json(data);
      } else {
        // Pass along the error response from the external API
        const errorData = await response.json();
        res.status(response.status).json(errorData);
      }
    } catch (error) {
      console.error("Proxy login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
