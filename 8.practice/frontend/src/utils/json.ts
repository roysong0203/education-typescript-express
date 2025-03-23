const fixJSON = (input: string): string => {
  try {
    // ✅ 1. 마지막 쉼표(,) 제거
    input = input.replace(/,\s*([\]}])/g, "$1");

    // ✅ 2. 속성 키를 큰따옴표로 감싸기
    input = input.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

    // ✅ 3. JSON 파싱 및 문자열 변환 (예쁘게 정렬)
    return JSON.stringify(JSON.parse(input), null, 2);
  } catch (error) {
    console.error("JSON 복구 실패:", error);
    return input; // 수정 불가능한 JSON일 경우 기본 반환
  }
};

const ensureHttps = (url: string): string => {
  if (!/^https?:\/\//.test(url)) {
    return `https://${url}`;
  }
  return url;
};

export { fixJSON, ensureHttps };
