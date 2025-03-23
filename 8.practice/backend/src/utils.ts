const generateRandomString = (length: number = 4): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

const ensureHttps = (url: string): string => {
  if (!/^https?:\/\//.test(url)) {
    return `https://${url}`;
  }
  return url;
};

export { generateRandomString, ensureHttps };
