import { client } from "../../../postmark";

export default async function post(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    client.sendEmailWithTemplate({
      TemplateId: "37243311",
      From: "support@ongrid.run",
      To: "bautistagonzalezlazo@gmail.com",
      TemplateModel: {
        product_name: "GridMine early access",
        name: "Usuario", // Puedes personalizar esto si tienes el nombre del usuario
        company_name: "Tu Empresa",
        company_address: "Dirección de tu empresa",
      },
    });
    // Encodificar el req.body como cadena JSON y luego en URI

    res.send(200);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
