import { useState, useEffect, Fragment } from "react";
import { ensureHttps, fixJSON } from "../utils/json";
import { useSearchParams } from "react-router-dom";

type Props = {
  apiUrl: string;
};

const CrudTest = ({ apiUrl }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMethod = searchParams.get("method") || "GET";
  const initialBody = searchParams.get("body") || "";
  const initialHeaders = searchParams.get("headers");
  const isValidJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const [url, setUrl] = useState(apiUrl);
  const [method, setMethod] = useState(initialMethod);
  const [requestHeaders, setRequestHeaders] = useState<
    Array<{ key: string; value: string }>
  >(
    initialHeaders && isValidJSON(decodeURIComponent(initialHeaders))
      ? JSON.parse(decodeURIComponent(initialHeaders))
      : [
          { key: "Content-Type", value: "application/json" },
          { key: "Authorization", value: "Bearer my_token" },
        ]
  );
  const [requestBody, setRequestBody] = useState(initialBody);
  const [responseHeaders, setResponseHeaders] = useState("");
  const [responseBody, setResponseBody] = useState("");

  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [responseHTML, setResponseHTML] = useState("");

  // Update search params whenever URL, method, or body changes
  useEffect(() => {
    const headersStr = encodeURIComponent(JSON.stringify(requestHeaders));
    const params: {
      url: string;
      method: string;
      body?: string;
      headers?: string;
    } = {
      url,
      method,
    };
    if (requestBody.trim()) params.body = requestBody;
    if (headersStr) params.headers = headersStr;

    setSearchParams(params, { replace: true });
  }, [url, method, requestBody, setSearchParams, requestHeaders]);

  const validateJSON = (json: string) => {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  };

  const initResponseData = () => {
    setResponseBody("");
    setResponseHeaders("");
    setImageSrc("");
    setFileLink("");
    setError("");
    setResponseHTML("");
  };

  const handleTest = async () => {
    initResponseData();

    if (!url.trim()) {
      setError("🚨 Enter the API URL.");
      return;
    }

    const fixed_body = fixJSON(requestBody);
    setRequestBody(fixJSON(fixed_body));

    if (
      (method === "POST" || method === "PUT" || method === "DELETE") &&
      !validateJSON(fixed_body)
    ) {
      setError("⚠️ Please enter a valid JSON format");
      return;
    }

    try {
      setError("");
      const customHeaders: Record<string, string> = {};
      requestHeaders.forEach((h) => {
        if (h.key.trim()) {
          customHeaders[h.key.trim()] = h.value;
        }
      });

      const options: RequestInit = {
        method,
        headers: customHeaders,
        body:
          method === "POST" || method === "PUT" || method === "DELETE"
            ? fixed_body
            : undefined,
      };

      const res = await fetch(ensureHttps(url), options);
      const contentType = res.headers.get("Content-Type");

      const headersObj: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        headersObj[key] = value;
      });
      setResponseHeaders(JSON.stringify(headersObj, null, 2));

      if (contentType?.includes("application/json")) {
        const responseText = await res.text();
        let responseData: string = responseText;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = responseText;
        }
        setResponseBody(
          typeof responseData === "string"
            ? responseData
            : JSON.stringify(responseData, null, 2)
        );
      } else if (contentType?.includes("image")) {
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onloadend = () => setImageSrc(reader.result as string);
        reader.readAsDataURL(blob);
      } else if (contentType?.includes("text/html")) {
        const responseText = await res.text();
        setResponseHTML(responseText);
      } else if (
        contentType?.includes("octet-stream") ||
        contentType?.includes("application")
      ) {
        const blob = await res.blob();
        const fileURL = URL.createObjectURL(blob);
        setFileLink(fileURL);
      }

      if (!res.ok) {
        throw new Error(`❌ Request failed! [${res.status} ${res.statusText}]`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "⚠️ Error while requesting!");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#ebedf0] p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-8 border border-[#dadde1]">
        <h2 className="text-3xl font-bold text-[#1c1e21] text-center">
          CRUD API Tester
        </h2>
        <p className="text-[#303846] text-center mt-2">
          📡 Test your API in a simple and clean interface!
        </p>

        <div className="mt-4">
          <label className="block text-[#1c1e21] font-medium">API URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-[#dadde1] rounded-lg focus:ring-2 focus:ring-[#eba12a]"
            placeholder="Enter API URL"
          />
        </div>

        <div className="mt-4">
          <label className="block text-[#1c1e21] font-medium">
            Select Method:
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 border border-[#dadde1] rounded-lg bg-white focus:ring-2 focus:ring-[#eba12a]"
          >
            <option value="GET">GET (Read)</option>
            <option value="POST">POST (Create)</option>
            <option value="PUT">PUT (Update)</option>
            <option value="DELETE">DELETE (Delete)</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-[#1c1e21] font-medium">
            Request Headers:
          </label>
          {requestHeaders.map((header, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Header Name"
                value={header.key}
                onChange={(e) => {
                  const newHeaders = [...requestHeaders];
                  newHeaders[index].key = e.target.value;
                  setRequestHeaders(newHeaders);
                }}
                className="w-1/2 p-2 border border-[#dadde1] rounded"
              />
              <input
                type="text"
                placeholder="Header Value"
                value={header.value}
                onChange={(e) => {
                  const newHeaders = [...requestHeaders];
                  newHeaders[index].value = e.target.value;
                  setRequestHeaders(newHeaders);
                }}
                className="w-1/2 p-2 border border-[#dadde1] rounded"
              />
              <button
                onClick={() => {
                  const newHeaders = requestHeaders.filter(
                    (_, i) => i !== index
                  );
                  setRequestHeaders(newHeaders);
                }}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setRequestHeaders([...requestHeaders, { key: "", value: "" }])
            }
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            ➕ Add Header
          </button>
        </div>

        {(method === "POST" || method === "PUT" || method === "DELETE") && (
          <div className="mt-4">
            <label className="block text-[#1c1e21] font-medium">
              Request Body (JSON):
            </label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const tabCharacter = "  ";
                  const updatedBody =
                    requestBody.substring(0, start) +
                    tabCharacter +
                    requestBody.substring(end);
                  setRequestBody(updatedBody);
                  setTimeout(() => {
                    e.currentTarget.selectionStart =
                      e.currentTarget.selectionEnd =
                        start + tabCharacter.length;
                  }, 0);
                }
              }}
              className="w-full p-3 border border-[#dadde1] rounded-lg font-mono text-sm bg-white focus:ring-2 focus:ring-[#eba12a]"
              rows={4}
              placeholder={'{}\nor\n{\n  "key": "value"\n}'}
            ></textarea>
          </div>
        )}

        <button
          onClick={handleTest}
          className="w-full mt-6 p-3 bg-[#eba12a] text-[#1c1e21] font-semibold rounded-lg hover:bg-[#ffc85c] transition"
        >
          🚀 Send Request
        </button>

        <div className="mt-6 text-left">
          <label className="block text-[#1c1e21] font-medium">
            Response Headers:
          </label>
          {responseHeaders && (
            <div className="mt-4 grid grid-cols-2 gap-2 bg-[#f5f7fa] p-4 border border-[#dadde1] rounded-lg text-sm">
              {Object.entries(
                JSON.parse(responseHeaders) as {
                  [key: string]: string;
                }
              ).map(([key, value], index) => (
                <Fragment key={index}>
                  <input
                    type="text"
                    readOnly
                    value={key}
                    className="bg-white p-2 border border-[#dadde1] rounded text-[#1c1e21] font-semibold"
                  />
                  <input
                    type="text"
                    readOnly
                    value={value}
                    className="bg-white p-2 border border-[#dadde1] rounded text-[#303846]"
                  />
                </Fragment>
              ))}
            </div>
          )}

          <label className="block text-[#1c1e21] font-medium mt-4">
            Response Data:
          </label>
          {error && (
            <pre className="text-red-600 bg-[#fff0f0] p-3 rounded-lg">
              {error}
            </pre>
          )}
          {responseBody && (
            <pre className="p-3 bg-[#f5f7fa] border border-[#dadde1] rounded-lg text-sm overflow-auto">
              {responseBody}
            </pre>
          )}
          {imageSrc && (
            <div className="mt-4">
              <label className="block text-[#1c1e21] font-medium">
                Image Preview:
              </label>
              <img
                src={imageSrc}
                alt="Response Image"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          )}
          {fileLink && (
            <div className="mt-4">
              <label className="block text-[#1c1e21] font-medium">
                Download File:
              </label>
              <a
                href={fileLink}
                download
                className="text-blue-600 hover:underline"
              >
                📥 Download
              </a>
            </div>
          )}
          {responseHTML && (
            <div className="mt-4">
              <label className="block text-[#1c1e21] font-medium">
                HTML Preview:
              </label>
              <iframe
                srcDoc={responseHTML}
                className="w-full h-64 border border-[#dadde1] rounded-lg"
                sandbox=""
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrudTest;
