export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const API_URL = "https://consoleapi.akashnet.net";
    const { address } = req.query;
  
    try {
      const response = await fetch(`${API_URL}/cosmos/bank/v1beta1/balances/${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error getting balance: ${response.statusText}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      res.status(500).json({ error: "Failed to fetch repositories" });
    }
  }
  