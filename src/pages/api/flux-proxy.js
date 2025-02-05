export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://stats.runonflux.io/fluxinfo?projection=benchmark"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if data has the expected structure
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected data structure");
    }

    let totalSsd = 0,
      totalRam = 0,
      totalStorage = 0;

    data.data.forEach((item) => {
      if (item.benchmark && item.benchmark.bench) {
        const bench = item.benchmark.bench;
        totalSsd += bench.ssd || 0;
        totalRam += bench.ram || 0;
        totalStorage += bench.cores || 0;
      }
    });

    // Convert MB to TB
    totalSsd = totalSsd / 1024;
    totalRam = totalRam / 1024;

    res.status(200).json({
      totalSsd,
      totalRam,
      totalStorage,
    });
  } catch (error) {
    console.error("Error in flux-proxy:", error);
    res.status(500).json({
      error: "Failed to fetch Flux data",
      details: error.message,
      stack: error.stack,
    });
  }
}
