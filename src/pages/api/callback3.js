export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    console.log(req.body);
    try {
      const { status, data } = req.body;

      if (status === 'success') {
        const { message, zelid, loginPhrase, signature, privilege } = data;

        // The signature is available in the 'signature' property
        console.log('Signature:', signature);

        // You can handle the signature as needed
        // For example, you may want to verify the signature against the original message
        // ...

        res
          .status(200)
          .json({ success: true, message: 'Signature received successfully' });
      } else {
        // Handle error case
        console.error('Error:', data.message);
        res
          .status(500)
          .json({ success: false, message: 'Error in processing the request' });
      }
    } catch (error) {
      console.error('CATCHEO ERROR:', error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
