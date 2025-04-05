import { apiRequest002, apiResponse003 } from "@shared/schema";
import { Router, Request, Response } from "express";

const liveClockRouter = Router();

liveClockRouter.post("/", async (req: Request, res: Response) => {
  /**
   * TODO:
   * 1. 클라이언트로부터 전달받은 요청 바디(req.body)에서 `url`(string)을 추출합니다.
   *    - Zod를 사용하여 `url` 필드가 존재하고, 유효한 URL 형식인지 검증하세요.
   *    - 유효하지 않은 경우 400 상태 코드와 함께 오류 메시지` { error:string }`를 응답합니다.
   *
   * 2. 검증된 `url`에 대해 GET 요청을 보냅니다.
   *    - fetch API를 사용하고, redirect는 "manual"로 설정합니다.
   *    - 요청에 실패하거나 예외가 발생하면 500 상태 코드와 함께 적절한 오류 메시지를 응답합니다.
   *
   * 3. 응답 헤더에서 `Date` 필드를 추출합니다.
   *    - 이 값은 `string | null`이므로 주의해서 다뤄야 합니다.
   *
   * 4. 추출한 `Date` 값을 `serverTime`이라는 이름으로 JSON 응답합니다.
   *    - 응답 형식은 `{ serverTime: string | null }`입니다.
   *    - Zod를 사용하여 응답 스키마를 검증한 후 응답하세요.
   *
   * 5. 지정되지 않은 모든 에러 상황에서는 `{ error: string }` 형식의 JSON과 함께 500 상태 코드를 응답하세요.
   */
  try {
    const safeUrlBody = apiRequest002.safeParse(req.body);
    if (!safeUrlBody.success) {
      res.status(400).json({ error: "Invalid URL" });
      return;
    }
    const { url } = safeUrlBody.data;

    const response = await fetch(url, { method: "GET", redirect: "manual" });

    const Date = response.headers.get("Date");
    const safeServerTimeBody = apiResponse003.safeParse({ serverTime: Date });
    if (!safeServerTimeBody.success) {
      res.status(500).json({ error: "Invalid server time" });
      return;
    }

    const { serverTime } = safeServerTimeBody.data;
    if (serverTime === null) {
      res.status(500).json({ error: "Server time is null" });
      return;
    }
    res.json({ serverTime: serverTime });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch the URL" });
  }
});

export default liveClockRouter;
