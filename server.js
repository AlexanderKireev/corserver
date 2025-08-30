import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
let errorCounter = 0;

const getRandom = (min, max) => Math.floor(min + Math.random() * (max - min));

const sendRequest = () => {
const randomTimeout = getRandom(300000, 540000);
  setTimeout(() => {
    fetch("https://corserver-1.onrender.com/?" + getRandom(1000000, 9999999))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let myDate = new Date();
        myDate.setHours(myDate.getHours() + 3);
        console.log(myDate.toLocaleString());
        errorCounter = 0;
        return response;
      })
      .catch(() => {
        errorCounter += 1;
        console.error("Fetch error", errorCounter);
        sendRequest();
      });
      fetch("https://frontend-project-12-b0jh.onrender.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let myDate = new Date();
        myDate.setHours(myDate.getHours() + 3);
        console.log("pr-12_run: " + myDate.toLocaleString());
        errorCounter = 0;
        return response;
      })
      .catch(() => {
        console.error("pr-12_fetch_error");
      });
  }, randomTimeout);
};

app.get("/", async (req, res) => {
  const request = req.originalUrl.slice(2);
  console.log(request);

  if (request.length > 7) {
    const respose = await fetch(request);
    const data = await respose.text();
    res.json(data);
  } else {
    sendRequest();
    res.send(null);
  }
});

app.listen(3001, () => {
  sendRequest();
  console.log("Go port 3001");
});
