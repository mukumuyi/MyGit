

function parseDateTime(dateTimeString, dateType) {
    console.log((dateTimeString))
    console.log(typeof(dateTimeString))
    if (dateType === "YYYYMMDDHHmmSS") {
      const year = dateTimeString.slice(0, 4);
      const month = dateTimeString.slice(4, 6);
      const day = dateTimeString.slice(6, 8);
      const hours = dateTimeString.slice(8, 10);
      const minutes = dateTimeString.slice(10, 12);
      const seconds = dateTimeString.slice(12, 14);
      const date = new Date(year, month - 1, day, hours, minutes, seconds);
      return Date.parse(date);
    } else if (dateType === "UNIX" || !isNaN(dateTimeString)) {
      return parseInt(dateTimeString);
    } else if (dateType === "YYYY/MM/DD HH:mm:SS") {
      const parts = dateTimeString.split(" ");
      const datePart = parts[0].split("/");
      const timePart = parts[1].split(":");    
      // Dateオブジェクトを作成
      const date = new Date(
          parseInt(datePart[0]), // 年
          parseInt(datePart[1]) - 1, // 月 (0-11)
          parseInt(datePart[2]), // 日
          parseInt(timePart[0]), // 時
          parseInt(timePart[1]) // 分
      );
      return Date.parse(date);
    } else {  
      return Date.parse(dateTimeString); // デフォルトはISO 8601形式の日付文字列
    }
  }

  console.log("result:",parseDateTime("2023/10/23 14:00","YYYY/MM/DD HH:mm:SS"))
  console.log("result:",parseDateTime("2023/10/23 14:00",""))
  console.log("result:",parseDateTime("1698037200000","YYYY/MM/DD HH:mm:SS"))
  console.log("result:",parseDateTime("1698037200000","UNIX"))
  console.log("result:",parseDateTime("1698037200000",""))

  


