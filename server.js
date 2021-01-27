/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const nodeFetch = require("node-fetch");

app.post("/", async (req, res) => {
  const { body } = req;
  const { recaptcha } = body;

  try {
    const response = await nodeFetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${recaptcha}`
    });

    const body = await response.json();

    console.log(body);

    if(body.success) {
      res.status(200).send(body).end();
    } else {
      throw new Error(body);
    }
  } catch(e) {
    res.status(500).send(e).end();
  }



});

app.listen(8080);
