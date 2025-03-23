const fetchData = (job, callback) => {
  setTimeout(() => {
    callback(job + "을 마쳤습니다.");
  }, 1000);
};

const main = () => {
  console.log("1. 데이터 요청 중...");

  fetchData("2. 데이터 요청", (result1) => {
    console.log(result1);

    fetchData("3. 데이터 전송", (result2) => {
      console.log(result2);

      fetchData("4. 데이터 검토", (result2) => {
        console.log(result2);
      });
    });
  });
};

main();
