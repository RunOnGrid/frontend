export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_URL = "https://explorer.runonflux.io";
  // const address = req.query.address;
  const address = "t1R12kiLjuyUkm8idRrWD4Y3nAwtoZaWZBT";

  try {
    const response = await fetch(`${API_URL}/api/addr/${address}/?noTxList=1`, {
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
