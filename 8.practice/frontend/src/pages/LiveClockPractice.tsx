import { useState, useEffect, useCallback } from "react";
import { ensureHttps } from "../utils/json";
import { useSearchParams } from "react-router-dom";

type Props = {
  apiUrl: string;
};

const LiveClock = ({ apiUrl }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialServerURL = searchParams.get("server") || "https://";
  const [serverURL, setServerURL] = useState(initialServerURL);
  const [currentServerURL, setCurrentServerURL] = useState(initialServerURL);
  const [time, setTime] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const fetchServerTime = useCallback(async () => {
    try {
      setError("");
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: currentServerURL }),
      };
      const res = await fetch(`${apiUrl}/live-clock`, options);
      const data = await res.json();
      if (!res.ok) throw new Error("❌ 서버 시간 가져오기 실패!");
      setTime(new Date(data.serverTime));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "⚠️ 서버 연결 오류!");
      }
    }
  }, [apiUrl, currentServerURL]);

  useEffect(() => {
    fetchServerTime();
    const interval = setInterval(() => {
      setTime((prevTime) =>
        prevTime ? new Date(prevTime.getTime() + 1000) : null
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentServerURL, fetchServerTime]);

  useEffect(() => {
    const syncInterval = setInterval(fetchServerTime, 10000);
    return () => clearInterval(syncInterval);
  }, [currentServerURL, fetchServerTime]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ebedf0] p-6">
      <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-8 border border-[#dadde1]">
        <h2 className="text-3xl font-bold text-[#1c1e21] text-center">
          ⏰ Real-Time Clock
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newServerURL = ensureHttps(serverURL);
            setCurrentServerURL(newServerURL);
            setSearchParams({ server: newServerURL }, { replace: true });
            setServerURL("https://");
          }}
          className="mt-6"
        >
          <input
            type="text"
            value={serverURL}
            onChange={(e) => setServerURL(e.target.value)}
            className="w-full p-3 border border-[#dadde1] rounded-lg"
            placeholder="Enter server URL"
          />
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-[#eba12a] text-[#1c1e21] font-semibold rounded-lg hover:bg-[#ffc85c] transition"
          >
            🔄 Connect to Server
          </button>
        </form>

        <p className="text-sm text-[#303846] mt-4 text-center">
          🌐 Connected to:{" "}
          <span className="font-semibold text-[#1c1e21]">
            {currentServerURL}
          </span>
        </p>

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

        {time ? (
          <div className="mt-6 flex items-center justify-center bg-[#303846] text-white px-6 py-4 rounded-lg shadow-lg">
            <p className="text-5xl font-mono">{time.toLocaleTimeString()}</p>
          </div>
        ) : (
          <p className="text-[#1c1e21] mt-6 text-center">⌛ 로딩 중...</p>
        )}
      </div>
    </div>
  );
};

export default LiveClock;
