export default async function handler(req, res) {
  const API_URL = process.env.GRID_API;

  if (req.method === "POST") {
   
    try {
      const { refreshToken } = req.body;
      const response = await fetch(
        `${API_URL}/logout?refresh_token=${refreshToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        res.status(200).json({ message: "Logout successful" });
      } else {
        const errorData = await response.json();
        res.status(response.status).json(errorData);
      }
    } catch (error) {
      console.error("Proxy logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
