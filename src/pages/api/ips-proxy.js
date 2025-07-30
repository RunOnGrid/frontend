// pages/api/logs/ips.js

export default async function handler(req, res) {
    const API_URL = process.env.GRID_API;
  if (req.method === 'GET') {
    const { appName } = req.query;

    if (!appName) {
      return res.status(400).json({ error: 'appName query parameter is required.' });
    }

    
    

    try {
      const response = await fetch(`${API_URL}/logs/ips/?appName=${appName}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          Authorization: req.headers.authorization,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.message || 'Failed to fetch data from backend.' });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}