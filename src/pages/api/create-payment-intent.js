export default async function handler(req, res) {
  const API_URL = process.env.GRID_API;

  if (req.method === "POST") {
    try {
      const { amount, currency, orderId, accessToken } = req.body;

      if (!amount || !currency || !orderId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const url = `${API_URL}/stripe/payment-intention?amount=${amount}&currency=${currency}&orderId=${orderId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ message: "Unauthorized" });
      }
    } catch (error) {
      console.error("Proxy payment intention error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
