// pages/api/create-payment-intent.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Obtener los datos del cuerpo de la solicitud
    const { amount, currency } = req.body;

    // Obtener el token de autorización
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res
        .status(401)
        .json({ message: "Token de autorización no proporcionado" });
    }

    // Hacer la solicitud al endpoint externo
    const response = await fetch(
      "https://backend-dev.ongrid.run/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
          accept: "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: currency || "USD",
        }),
      }
    );

    const responseText = await response.text();

    if (responseText.includes("_secret_") && responseText.startsWith("pi_")) {
      return res.status(200).json({ clientSecret: responseText });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Error al parsear la respuesta del backend:", responseText);
      return res.status(500).json({
        message: "El servidor devolvió una respuesta no válida",
      });
    }

    // Si la respuesta no es exitosa
    if (!response.ok) {
      console.error("Error del backend:", data);
      return res.status(response.status).json({
        message: data.message || `Error del servidor: ${response.status}`,
        error: data,
      });
    }

    const clientSecret = data;

    if (!clientSecret) {
      console.error("Respuesta del backend sin clientSecret:", data);
      return res.status(500).json({
        message:
          "No se pudo encontrar el clientSecret en la respuesta del servidor",
      });
    }

    // Devolver el clientSecret en el formato esperado por Stripe.js
    return res.status(200).json({ clientSecret });
  } catch (error) {
    console.error("Error en el procesamiento:", error);
    return res.status(500).json({
      message: "Error al procesar la solicitud",
      error: error.message,
    });
  }
}
