export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("http://localhost:3000/sign-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
