const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=9e4b811babaa126ed4b864f71bd01c3f"
    )
      .on("data", function (chunk) {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        //console.log(arrData[0].main.temp);
        const realTimeDate = arrData.map((val)=>{
            replaceVal(homeFile,val);
        })
        res.write(chunk); // Send the API response to the client
      })
      .on("end", function (err) {
        if (err) {
          console.log("Connection closed due to errors", err);
          res.end(); // End the response if there is an error
        } else {
          console.log("End");
          res.end(); // End the response after receiving the complete data
        }
      });
  }
});

server.listen(5000, "127.0.0.1");
