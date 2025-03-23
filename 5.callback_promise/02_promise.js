const fetchData = (job) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(job + "을 마쳤습니다.");
    }, 1000);
  });
};

const main = async () => {
  console.log("1. 데이터 요청 중...");

  const result1 = await fetchData("2. 데이터 요청");
  console.log(result1);

  const result2 = await fetchData("3. 데이터 전송");
  console.log(result2);

  const result3 = await fetchData("3. 데이터 검토");
  console.log(result3);
};

main();
