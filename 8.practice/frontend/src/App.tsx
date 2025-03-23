import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CrudTest from "./pages/CrudTest";
import ShortURL from "./pages/ShortURLPractice";
import LiveClock from "./pages/LiveClockPractice";
import { NODE_APP_API_URL } from "./config";
import React from "react";

const pages = [
  { path: "/crud-test", name: "CRUD Test", element: <CrudTest apiUrl={""} /> },

  {
    path: "/short-url",
    name: "Short URL",
    element: <ShortURL apiUrl={""} />,
  },
  {
    path: "/live-clock",
    name: "Live Clock",
    element: <LiveClock apiUrl={""} />,
  },
];

type Props = {
  apiUrl: string;
  setApiUrl: (url: string) => void;
};

const Header = ({ apiUrl, setApiUrl }: Props) => {
  const [serverStatus, setServerStatus] = useState("⏳ Checking...");

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const res = await fetch(`${apiUrl}/health`);
        if (!res.ok) throw new Error("Server Down");
        const data = await res.json();
        setServerStatus(`✅ ${data.status}`);
      } catch {
        setServerStatus("❌ Back-end Server is Down");
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 1000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <div className="w-full bg-white text-[#1c1e21] flex flex-wrap md:flex-nowrap items-center justify-between py-3 px-6 shadow-sm border-b border-[#dadde1] gap-2">
      {/* 홈 버튼 */}
      <Link
        to="/"
        className="bg-[#eba12a] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#ffd267] transition"
      >
        🏠 Home
      </Link>

      <div>
        {/* API URL Buttons */}

        <button
          onClick={() => {
            setApiUrl("http://localhost:4000");
            sessionStorage.setItem("apiUrl", "http://localhost:4000");
            window.location.reload();
          }}
          className={`px-4 py-2 rounded-l-lg font-semibold ${
            apiUrl === "http://localhost:4000"
              ? "bg-[#eba12a] text-black"
              : "bg-gray-200 text-gray-700"
          } hover:bg-[#ffd267] transition`}
        >
          Localhost
        </button>
        <button
          onClick={() => {
            setApiUrl("https://api.edu.techceo.kr");
            sessionStorage.setItem("apiUrl", "https://api.edu.techceo.kr");
            window.location.reload();
          }}
          className={`px-4 py-2 rounded-r-lg font-semibold ${
            apiUrl === "https://api.edu.techceo.kr"
              ? "bg-[#eba12a] text-black"
              : "bg-gray-200 text-gray-700"
          } hover:bg-[#ffd267] transition`}
        >
          Example
        </button>

        {/* API URL Input */}
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => {
            setApiUrl(e.target.value);
            sessionStorage.setItem("apiUrl", e.target.value);
          }}
          readOnly
          placeholder="Enter backend API URL"
          className="flex-1 w-[250px] px-3 py-2 border border-[#dadde1] rounded text-sm mt-2
             bg-[#f5f5f5] text-[#888] cursor-not-allowed"
        />

        {/* 서버 상태 표시 */}
        <span className="text-sm font-medium whitespace-nowrap ml-4">
          {`${serverStatus}`}
        </span>
      </div>
      <div></div>
    </div>
  );
};

/* ✅ 홈 화면 */
const Home = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#ebedf0] p-8">
    <h1 className="text-4xl font-bold text-[#1c1e21] mb-6 text-center">
      🛠 API Test Suite
    </h1>
    <p className="text-[#303846] text-lg text-center mb-8">
      Select a test to begin API validation & debugging.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {pages.map((page, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6 shadow-md rounded-2xl text-center bg-[#ffffff] border border-[#dadde1] hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2 text-[#1c1e21]">
              {page.name}
            </h2>
            <Link
              to={page.path}
              className="px-4 py-2 mt-3 bg-[#eba12a] text-[#000000] rounded-lg hover:bg-[#ffd267] transition"
            >
              Go to Test
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ✅ App (라우팅 포함) */
const App = () => {
  const [apiUrl, setApiUrl] = useState<string>(
    sessionStorage.getItem("apiUrl") || NODE_APP_API_URL
  );
  return (
    <Router>
      <Header apiUrl={apiUrl} setApiUrl={setApiUrl} />
      <Routes>
        <Route path="/" element={<Home />} />

        {pages.map((page, index) => (
          <Route
            key={index}
            path={page.path}
            element={React.cloneElement(page.element, {
              apiUrl,
            })}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
export default App;
