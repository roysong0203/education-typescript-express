import { Router } from "express";

const ssrRenderRouter = Router();

ssrRenderRouter.get("/", (req, res) => {
  const {
    name = "제목 없음",
    header = "헤드라인 없음",
    main = "내용 없음",
  } = req.query;

  const escape = (str: unknown) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  // 여기서 HTML 문자열을 JS로 완성시켜서 보내는 SSR 방식
  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <title>${escape(name)}</title>
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
        <h1>${escape(header)}</h1>
      </header>
      <main>
        <p>${escape(main)}</p>
      </main>
      <footer>
        &copy; ${new Date().getFullYear()} ${name}. Some rights reserved.
      </footer>
    </body>
    </html>
  `;

  res.send(html);
});

export default ssrRenderRouter;
