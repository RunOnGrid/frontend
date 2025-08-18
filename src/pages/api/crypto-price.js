export default async function handler(req, res) {
  // Solo permitir método GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener el ID de la criptomoneda desde query params
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Crypto ID is required' });
    }

    // Construir la URL de la API
    const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/lite?id=${id}`;

    // Hacer la petición a CoinMarketCap
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json, text/plain, */*',
      }
    });

    if (!response.ok) {
      throw new Error(`CoinMarketCap API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Devolver los datos
    res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching crypto price:', error);
    res.status(500).json({ 
      error: 'Failed to fetch crypto price',
      message: error.message 
    });
  }
}

// Función para generar un ID de request único
function generateRequestId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
