const express = require("express");
const fetch = require("node-fetch");

const app = express();

// گرفتن مقدار از ENV
const TARGET_DOMAIN = process.env.TARGET_DOMAIN;

app.use(async (req, res) => {
  try {
    const target = req.query.url;

    if (!target) {
      return res.send("Relay is working 🚀");
    }

    // اگر TARGET_DOMAIN تنظیم شده بود → چک کن
    if (TARGET_DOMAIN && !target.startsWith(TARGET_DOMAIN)) {
      return res.status(403).send("Forbidden: Invalid domain");
    }

    const response = await fetch(target);
    const data = await response.text();

    res.send(data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});