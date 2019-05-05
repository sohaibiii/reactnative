// const moment = require("moment");

// const dbtime = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");

// console.log("db time is ", dbtime);

// console.log(
//   moment(`${dbtime}`, "YYYY-MM-DDTHH:mm:ss.SSS").format(" YYYY-MM-DD hh:mm A")
// );

const removeZeroDecimal = num => {
  return num.split(".")[1] === "0" ? (num = num.split(".")[0]) : num;
};

const newnum = removeZeroDecimal("89.8");
console.log(newnum);
