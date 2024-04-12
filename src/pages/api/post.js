import cookie from "cookie"

export default async function post(req, res) {
  if (req.method === 'POST') {
    const { address, message, signature } = req.body;

    // Encodificar el req.body como cadena JSON y luego en URI
    const dataString = encodeURIComponent(JSON.stringify(req.body));

    // Redirigir al usuario con la información en la URL
    res.redirect(302, `/?data=${dataString}`);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}