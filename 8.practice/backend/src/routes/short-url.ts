import express, { Request, Response } from "express";
import { IMappingTable } from "@shared/schema";
import { z } from "zod";
const shortUrlRouter = express.Router();
const mappingTable: IMappingTable = {};

/// originalUrl을 shortCode로 변환
shortUrlRouter.post("/", (req: Request, res: Response) => {
  /**
   * TODO:
   * 1. req.body에서 originalURL(string)을 추출합니다.
   *    - Zod를 사용해 유효한 URL인지 검증합니다.
   *    - 유효하지 않다면 400 상태 코드와 함께 에러 메시지를 응답하세요.
   *
   * 3. mappingTable의 키들과 중복되지 않는 고유한 shortCode를 생성합니다. 방법은 여러가지.
   *
   * 4. 중복되지 않는 shortCode가 생성되면 mappingTable에 다음과 같이 저장합니다:
   *    {
   *      [shortCode]: {
   *        originalUrl: originalURL,
   *        visits: 0
   *      }
   *    }
   *
   * 5. { shortCode }를 JSON으로 응답합니다.
   */
  try {
    const bodySchema = z.object({
      originalUrl: z.string().url()
    });
    const safeBody = bodySchema.safeParse(req.body);
    if (!safeBody.success) {
      res.status(400).json({ error: "Invalid URL" });
      return;
    }
    const { originalUrl } = safeBody.data;

    let shortCode: string;
    do {
      shortCode = Math.random().toString(36).slice(2, 6);
    }
    while (mappingTable[shortCode]);

    const result = {
      originalUrl,
      visits: 0
    };
    mappingTable[shortCode] = result;

    res.json({ shortCode });
  } catch (error) {
    console.error("Failed to generate short code:", error);
    res.status(500).json({ error: "Failed to generate short code" });
  }
});

/// 현재 mappingTable을 JSON으로 응답
shortUrlRouter.get("/stats", (req: Request, res: Response) => {
  /**
   * TODO:
   * 1. mappingTable 객체 전체를 JSON으로 응답합니다. Zod 스키마로 검증합니다.
   * 2. 지정되지 않은 모든 에러 상황에서는 `{ error: string }` 형식의 JSON과 함께 500 상태 코드를 응답하세요.
   */

  try {
    res.json(mappingTable);
  } catch (error) {
    console.error("Failed to parse mappingTable:", error);
    res.status(500).json({ error: "Failed to parse mappingTable" });
  }
});

/// shortCode를 originalUrl로 리디렉션
shortUrlRouter.get("/", (req: Request, res: Response) => {
  /**
   * TODO:
   * 1. req.query에서 shortCode를 추출합니다.
   *
   * 2. mappingTable에서 해당 shortCode가 존재하는지 확인합니다.
   *    - 없다면 404 상태 코드와 함께 "404.html" (backend/public 폴더에 있음) 응답
   *
   * 3. 존재하면 해당 originalUrl로 visits 수를 1 증가시키고,
   *    res.redirect(originalUrl)로 리디렉션합니다.
   * 4. 지정되지 않은 모든 에러 상황에서는 `{ error: string }` 형식의 JSON과 함께 500 상태 코드를 응답하세요.
   */
  try {
    res.json({});
  } catch (error) {
    console.error("Failed to redirect:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
});

export default shortUrlRouter;
