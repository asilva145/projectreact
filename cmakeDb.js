/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const cmakeDB = require("./cmakeDB");

const { clients } = cmakeDB;
const data = JSON.stringify({ clients });
const filepath = path.join(__dirname, "data.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log(" created ");
});
