export default async function handler(req, res) {
    const API_URL = process.env.GIT_API;
  
    if (req.method === "POST") {
      try {
       
        const { username, pat, imagePath } = req.body;

  
        const response = await fetch(`${API_URL}/docker/validate-access`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.authorization,
          },
          body: JSON.stringify({ username, pat, imagePath }),
        });
        
        if (response.ok) {
          const data = await response.json();
        
          res.status(200).json(data);
        } else {
          const errorData = await response.json();
          console.log(errorData, username, pat, imagePath);
          res.status(404).json(errorData);
        }
      } catch (error) {
        console.error("Image validator error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  