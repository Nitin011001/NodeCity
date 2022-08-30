const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate=require('./modules/replaceTemplate');


const tempOverView = fs.readFileSync(
  `${__dirname}/templetes/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templetes/template-card.html`,
  "utf-8"
);
console.log(tempCard)
const tempPlace = fs.readFileSync(
  `${__dirname}/templetes/template-place.html`,
  "utf-8"
);
const jsonData = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const jsonObject = JSON.parse(jsonData);
console.log(replaceTemplate(tempCard,jsonObject[1]))

// console.log(jsonObject);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview route
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    console.log(query)
    const cardHtml = jsonObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
      console.log(cardHtml)
    const output = tempOverView.replace("{%PLACE-CARDS%}", cardHtml);
    // console.log(output);
    res.end(output);
  } else if (pathname === "/place") {
    const place = jsonObject[query.id];
    res.writeHead(200, { "Content-type": "text/html" });
    const output = replaceTemplate(tempPlace, place);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(jsonData);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening");
});
