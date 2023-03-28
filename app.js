const { response } = require("express");
const express = require("express");
//HTTPS – the Standard Library
const https = require("https"); //Native node https module no need to install it is already bundled in node project
const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=3177d91b335279c0b3f965a84a34ae55&units=imperial&units=metric";

  //HTTP Request to an external server through API(Menu)
  https.get(url, function (response) {
    console.log("statusCode:", response.statusCode); //logged the response with status code on console
    response.on("data", function (data) {
      //console.log(data); //This Structure the data in Hexadecimal Form :CONSOLE-OUTPUT=> <Buffer 7b 22 63 6f 6f 72 64 22 3a 7b 22 6c 6f 6e 22 3a 32 2e 33 34 38 38 2c 22 6c 61 74 22 3a 34 38 2e 38 35 33 34 7d 2c 22 77 65 61 74 68 65 72 22 3a 5b 7b ... 414 more bytes>
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const pressure = weatherData.main.pressure;
      const weatherDescription = weatherData.weather[0].description;
      res.send(
        "<center> <h1> The temperature in Paris at the moment is: " +
          temp +
          " degress Celcius  </h1> </center> </style>"
      );
    });

    /* console.log(
        " The weather description in json Array Object:",
        weatherDescription
      );

      //const main = weatherData.main.temp & weatherData.main.pressure;
      //const pressure = weatherData.main.pressure;
      //console.log(
      //   " The temperature & Pressure in Paris at the moment is:",
      //   main
      // );

      console.log(" The temperature in Paris at the moment is:", temp);
      console.log(" The pressure in Paris at the moment is:", pressure);

      //console.log(weatherData); // JSON.parse() structure the data into java scsript object notation format that json object easily human readible and light-weight and be collapsed most used data format is JSON
      /*const object = {
        name: "Mudsir",
        favouriteFood: "Cemra",
      };
      console.log(JSON.stringify(object));//by JSON.stringify() we are converting into the single-line-string:Console =>{"name":"Mudsir","favouriteFood":"Cemra"}*/
  });
});

//   res.send("Server is up and running"); //make get request to external server node
// });

app.listen(3000, function () {
  console.log("Server is running sucessfully on port: 3000.");
});
