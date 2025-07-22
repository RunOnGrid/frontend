export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    console.log(req.body,'esto mando')
    const API_URL = process.env.GRID_API;
    const response = await fetch(`${API_URL}/akash/choose-provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
      body: JSON.stringify(req.body),
    });
    
    if (!response.ok) {
      throw new Error(
        `Akash API Error: ${akashResponse.status} ${akashResponse.statusText}`
      );
    }
    
    const data = await response.json();
    console.log(data)
    
    res.status(200).json(data);
  } catch (error) {
    console.error("Full error details:", error);
    res
      .status(500)
      .json({ message: "Error deploying to Akash", error: error.message });
  }
}
