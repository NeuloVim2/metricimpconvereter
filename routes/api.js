'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  console.log("in apiRoutes");
  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initUnit === "invalid unit" && initNum === "invalid number")
      res.json("invalid number and unit");

    if (initUnit === "invalid unit")
      res.json(initUnit);

    if (initNum === "invalid number")
      res.json(initNum);

    if (initNum !== "invalid number" || initUnit !== "invalid unit") {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
      let spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
      let result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      result.string = `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;

      res.json({ initNum: result.initNum, initUnit: result.initUnit, returnNum: result.returnNum, returnUnit: result.returnUnit, string: result.string });
    }
  })

};
