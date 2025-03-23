import { Router } from "express";

const csrRouter = Router();

csrRouter.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <title>CSR Example</title>
      <script defer>
        window.addEventListener("DOMContentLoaded", () => {
          const params = new URLSearchParams(window.location.search);
          const name = params.get("name") || "제목 없음";
          const header = params.get("header") || "헤드라인 없음";
          const main = params.get("main") || "내용 없음";

          document.title = name;
          document.getElementById("header").textContent = header;
          document.getElementById("main").textContent = main;
          document.getElementById("footer").innerHTML = \`&copy; \${new Date().getFullYear()} \${name}. Some rights reserved.\`;
        });
      </script>
      <style>
        body {
          font-family: "Segoe UI", sans-serif;
          background: #f9f9f9;
          color: #333;
          padding: 2rem;
          max-width: 800px;
          margin: auto;
        }
        header {
          border-bottom: 2px solid #ddd;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
        }
        h1 {
          font-size: 2rem;
          color: #222;
        }
        p {
          font-size: 1.125rem;
          line-height: 1.6;
        }
        footer {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: #888;
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
      </style>
    </head>
    <body>
      <header>
        <h1 id="header">로딩 중...</h1>
      </header>
      <main>
        <p id="main">내용을 불러오는 중입니다...</p>
      </main>
      <footer id="footer">
        잠시만 기다려주세요...
      </footer>
    </body>
    </html>
  `);
});

export default csrRouter;
