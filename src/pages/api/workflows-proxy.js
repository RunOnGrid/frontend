export default async function handler(req, res) {
    const API_URL = process.env.GIT_API;
    
    if (req.method === "POST") {
      try {
        const { installationId, owner, repo, workflow, branch } = req.body;
       
        
        const response = await fetch(`${API_URL}/workflows/run`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            installationId,
            owner,
            repo,
            workflow,
            branch,
          }),
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          const errorData = await response.json();
          res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error("Proxy login error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }