import { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
type Props = {
  apiUrl: string;
};
const ShortURL = ({ apiUrl }: Props) => {
  const [originalURL, setOriginalURL] = useState("https://");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");
  const [urlStats, setUrlStats] = useState<
    { shortCode: string; visits: number; originalUrl: string }[]
  >([]);

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleShorten = async () => {
    try {
      setError("");
      const res = await fetch(`${apiUrl}/short-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalURL }),
      });

      const data = await res.json();
      console.log(data.error);
      if (!res.ok) throw new Error(data.error);

      setShortURL(`${apiUrl}/short-url?shortCode=${data.shortCode}`);
      fetchStats();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
        setError(err.message);
      }
    }
  };

  interface StatsData {
    [key: string]: { visits: number; originalUrl: string };
  }

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${apiUrl}/short-url/stats`);
    const data: StatsData = await res.json();

    const arrayData = Object.entries(data)
      .map(([key, value]) => ({
        shortCode: key,
        visits: value.visits,
        originalUrl: value.originalUrl,
      }))
      .reverse();

    setUrlStats(arrayData);

    if (chartRef.current) {
      chartRef.current.data.labels = arrayData.map((url) => url.shortCode);
      chartRef.current.data.datasets[0].data = arrayData.map(
        (url) => url.visits
      );
      chartRef.current.update();
    } else {
      if (canvasRef.current) {
        chartRef.current = new Chart(canvasRef.current, {
          type: "bar",
          data: {
            labels: arrayData.map((url) => url.shortCode),
            datasets: [
              {
                label: "Visit Count",
                data: arrayData.map((url) => url.visits),
                backgroundColor: "#eba12a",
              },
            ],
          },
        });
      }
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ebedf0] p-6">
      <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-8 border border-[#dadde1]">
        <h2 className="text-3xl font-bold text-[#1c1e21] text-center">
          🔗 URL Shortener
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6">
          <input
            type="text"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
            className="w-full p-3 border border-[#dadde1] rounded-lg"
            placeholder="Enter your URL"
          />
          <button
            onClick={handleShorten}
            className="w-full mt-4 p-3 bg-[#eba12a] text-[#1c1e21] font-semibold rounded-lg hover:bg-[#ffc85c] transition"
          >
            ✂️ Shorten URL
          </button>
        </form>

        {shortURL && (
          <p className="mt-4 text-center text-[#303846]">
            ✅ Your short URL:{" "}
            <a
              href={shortURL}
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              {shortURL}
            </a>
          </p>
        )}

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

        <h3 className="text-2xl font-bold text-[#1c1e21] mt-6 text-center">
          📊 URL Statistics
        </h3>
        <canvas ref={canvasRef} className="mt-4"></canvas>

        <div className="mt-6">
          <h4 className="text-xl font-semibold text-[#1c1e21] mb-2 text-center">
            🔗 Short URL Mappings
          </h4>
          <ul className="space-y-2">
            {urlStats.map((url) => (
              <li
                key={url.shortCode}
                className="bg-white p-3 rounded-lg border border-[#dadde1] shadow-sm"
              >
                <div className="text-sm text-[#303846]">
                  <span className="font-medium">Short:</span>{" "}
                  <a
                    href={`${apiUrl}/short-url?shortCode=${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {`${apiUrl}/short-url?shortCode=${url.shortCode}`}
                  </a>
                </div>
                <div className="text-sm text-[#303846]">
                  <span className="font-medium">Original:</span>{" "}
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1c1e21] underline break-all"
                  >
                    {url.originalUrl}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShortURL;
