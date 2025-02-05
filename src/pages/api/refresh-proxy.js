export default async function handler(req, res) {
  const API_URL = process.env.GRID_API;

  if (req.method === "POST") {
    try {
      if (!req.body.refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      const response = await fetch(
        `${API_URL}/login/refresh?refresh_token=${req.body.refreshToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json(errorData);
      }

      const responseBody = await response.text();

      if (!responseBody) {
        console.error("Empty response body from the refresh endpoint.");
        return res.status(500).json({ message: "Empty response from server" });
      }

      let newTokens;
      try {
        newTokens = JSON.parse(responseBody);
      } catch (err) {
        console.error("Error parsing JSON response:", err);
        return res.status(500).json({ message: "Failed to parse response" });
      }

      res.status(200).json({
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token,
        expires_in: newTokens.expires_in,
        refresh_expires_in: newTokens.refresh_expires_in,
      });
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
