export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({ message: "Token de autorización no proporcionado" });
    }

    const amount = 5; // Monto de $0.00
    

    const response = await fetch(
      "https://backend-dev.ongrid.run/payment/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
          accept: "application/json",
        },
        body: JSON.stringify({ amount, currency: "USD" }),
      }
    );

    const responseBody = await response.text();

    let data;
    try {
      data = JSON.parse(responseBody);
    } catch {
      return res.status(500).json({ message: "Respuesta inválida del servidor", raw: responseBody });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        message: data?.message || `Error del servidor: ${response.status}`,
        error: data,
      });
    }

    if (!data.url) {
      return res.status(500).json({ message: "No se recibió una URL de checkout", response: data });
    }

    return res.status(200).json({ url: data.url });

  } catch (error) {
    console.error("Error en el procesamiento:", error);
    return res.status(500).json({
      message: "Error al procesar la solicitud",
      error: error.message,
    });
  }
}
