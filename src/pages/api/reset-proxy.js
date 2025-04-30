export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const API_URL = process.env.GRID_API;
    const {token, newPassword} = req.body
    
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token, newPassword}),
      });

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