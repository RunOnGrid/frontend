export default async function handler(req, res) {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const API_URL = process.env.GRID_API;
    const { id } = req.query; 
  
    try {
      const response = await fetch(
        `${API_URL}/deployments/${id}`,
        {
          method: "DELETE",
          headers: {
            "accept": "*/*",
            "Authorization": req.headers.authorization,
          }
        }
      );
     
      if (!response.ok) {
        throw new Error(`Error deleting deployment: ${response.statusText}`);
      }
      
      // Para respuestas DELETE, es posible que no haya contenido que devolver
      if (response.status === 204) {
        return res.status(204).end();
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error deleting deployment:", error);
      res.status(500).json({ error: "Failed to delete deployment" });
    }
  }