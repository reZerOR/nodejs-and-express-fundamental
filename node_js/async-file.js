const fs = require("fs");

fs.writeFile("./text/write.txt", "my name is encrypted", "utf-8", (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("succesfully written data");
});
