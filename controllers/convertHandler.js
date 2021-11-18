const math = require('mathjs');

function ConvertHandler() {


  const numFormat = /^(\d+|(\d*\.{0,1}\d+[/\/.]{1}\d*\.{0,1}\d+))(?=([a-zA-Z]+)$)/;
  const unitFormat = /((gal)|L|(mi)|(km)|(kg)|(lbs))$/i;

  this.getNum = function (input) {
    if (numFormat.test(input)) {
      let num = input.split(numFormat)[1]
      return isFraction(num)
        ? parseFloat(math.divide(math.bignumber(num.split("/")[0]), math.bignumber(num.split("/")[1])))
        : parseFloat(num);
    }

    if (!/^\d+/.test(input))
      return 1;

    return "invalid number";
  };

  this.getUnit = function (input) {
    if (unitFormat.test(input)) {

      let unit = input.split(unitFormat)[1];
      if (/^l$/i.test(unit)) {

        return unit.toUpperCase();
      }

      return unit.toLowerCase();
    }

    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "L": return "gal";
      case "gal": return "L";
      case "lbs": return "kg";
      case "kg": return "lbs";
      case "mi": return "km";
      case "km": return "mi";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "L": return "liters";
      case "gal": return "gallons";
      case "lbs": return "pounds";
      case "kg": return "kilograms";
      case "mi": return "miles";
      case "km": return "kilometers";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "L": result = math.round(math.divide(math.bignumber(initNum), math.bignumber(galToL)), 5);
        break;

      case "gal": result = math.round(math.multiply(math.bignumber(initNum), math.bignumber(galToL)), 5);
        break;

      case "lbs": result = math.round(math.multiply(math.bignumber(initNum), math.bignumber(lbsToKg)), 5);
        break;

      case "kg": result = math.round(math.divide(math.bignumber(initNum), math.bignumber(lbsToKg)), 5);
        break;

      case "mi": result = math.round(math.multiply(math.bignumber(initNum), math.bignumber(miToKm)), 5);
        break;

      case "km": result = math.round(math.divide(math.bignumber(initNum), math.bignumber(miToKm)), 5);
        break;

    }
    return parseFloat(result);
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return { initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit };
  };
};
const isFraction = str => str.indexOf("/") !== -1 ? true : false;

module.exports = ConvertHandler;
