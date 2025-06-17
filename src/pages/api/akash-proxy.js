export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://console-api.akash.network/v1/network-capacity"
    );

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${text.substring(
          0,
          200
        )}...`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(
        `Expected JSON, got ${contentType}. Body: ${text.substring(0, 200)}...`
      );
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in akash-proxy:", error);
    res.status(500).json({
      error: "Failed to fetch data",
      details: error.message,
      stack: error.stack,
    });
  }
}