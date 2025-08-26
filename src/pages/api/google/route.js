export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idToken } = req.body;

    // Verificar token con Google
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    const tokenInfo = await response.json();

    if (tokenInfo.error) {
      return res.status(400).json({ error: "Token inválido" });
    }

    return res.status(200).json({
      success: true,
      providerId: "google",
      email: tokenInfo.email,
      user: {
        id: tokenInfo.sub,
        name: tokenInfo.name,
        picture: tokenInfo.picture,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}