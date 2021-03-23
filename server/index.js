/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const nodeFetch = require("node-fetch");

app.post("/recaptcha", async (req, res) => {
  const { body } = req;
  const { recaptcha } = body;

  try {
    const response = await nodeFetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${recaptcha}`,
      }
    );

    const recaptchaBody = await response.json();

    if (recaptchaBody.success) {
      res.status(200).send(recaptchaBody).end();
    } else {
      throw new Error(recaptchaBody);
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
});

app.post("/followup-boss", async (req, res) => {
  const { body } = req;
  const { formData } = body;
  const {
    address,
    howSoon,
    condition,
    propertyType,
    workingWithAgent,
    firstName,
    lastName,
    email,
    phone,
    unit,
  } = formData;

  console.log({ formData });

  try {
    // Build the data from the form data
    const dataToSend = {
      source: "Toronto Home Value Website",
      type: "Seller Inquiry",
      message: `Condition of property: ${condition}\nHow soon do they want to sell: ${howSoon}\nIs this contact working with an agent?: ${workingWithAgent}\nProperty type: ${propertyType}`,
      person: {
        firstName,
        lastName,
        emails: [{ value: email }],
        phones: [{ value: phone }],
        addresses: [{ street: `${unit && `#${unit} - `}${address}` }],
      },
    };

    console.log({ dataToSend });

    const response = await nodeFetch("https://api.followupboss.com/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          process.env.FOLLOWUP_BOSS_API_KEY
        ).toString("base64")}`,
      },
      body: JSON.stringify(dataToSend),
    });

    const followupBossBody = await response.json();

    if (followupBossBody.errorMessage) {
      throw new Error(followupBossBody.errorMessage);
    }

    res.status(200).send(followupBossBody).end();
  } catch (e) {
    res
      .status(e.status || 400)
      .send(e.message)
      .end();
  }
});

app.listen(8080);
