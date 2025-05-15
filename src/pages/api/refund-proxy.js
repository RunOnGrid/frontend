export default async function handler(req, res) {
  const API_URL = process.env.GRID_API;

  if (req.method === "POST") {
    try {
      const { deployId } = req.body;

      const response = await fetch(`${API_URL}/akash/refund/${deployId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        res.status(response.status).json(errorData);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Proxy login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
