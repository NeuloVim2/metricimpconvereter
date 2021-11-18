const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const math = require('mathjs');

let convertHandler = new ConvertHandler();

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;
const spelledOutUnts = {
  L: "liters",
  gal: "gallons",
  lbs: "pounds",
  kg: "kilograms",
  mi: "miles",
  km: "kilometers"
}
const returnUnits = {
  L: "gal",
  gal: "L",
  lbs: "kg",
  kg: "lbs",
  mi: "km",
  km: "mi"
}

suite('Unit Tests', function () {
  test("correctly read a whole number input", () => {
    assert.strictEqual(convertHandler.getNum("1L"), 1, "these number is not equel")
  })

  test("correctly read a decimal number input", () => {
    assert.strictEqual(convertHandler.getNum("1.2L"), 1.2, "these numbers are not equal")
  })

  test("correctly read a fractional input", () => {
    assert.strictEqual(convertHandler.getNum("2/5mi"), 0.4, "these numbers are not equal")
  })

  test("correctly read a fractional input with a decimal", () => {
    assert.strictEqual(convertHandler.getNum("8/2.2mi"), 3.6363636363636363636363636363636, "these numbers are not equal")
  })

  test("correctly return an error on a double-fraction", () => {
    assert.strictEqual(convertHandler.getNum("1/22/2.2mi"), "invalid number", "these numbers are not equal")
  })

  test("correctly default to a numerical input of 1 when no numerical input is provided", () => {
    assert.strictEqual(convertHandler.getNum("mi"), 1, "1 is not returned, when no numerical input is provided");
  })

  test("correctly read each valid input unit", () => {
    let testDate = {
      L: "1/2L",
      gal: "1.2gal",
      lbs: "1.2/3lbs",
      kg: "15kg",
      mi: "0.25mi",
      km: "87.2/100km"
    }
    Object.entries(testDate).forEach(([unit, testData]) => assert.strictEqual(convertHandler.getUnit(testData), unit, `convertHandler for ${testData}' is not return ${unit}'`));
  })

  test("correctly return an error for an invalid input unit", () => {
    assert.strictEqual(convertHandler.getUnit("1.2k"), "invalid unit", "error is not returned");
  })

  test("return the correct return unit for each valid input unit", () => {
    Object.entries(returnUnits).forEach(([unit, returnUnit]) => assert.strictEqual(convertHandler.getReturnUnit(unit), returnUnit, `${unit}' returnUnit is invalid'`));
  })

  test("correctly return the spelled-out string unit for each valid input unit", () => {
    Object.entries(spelledOutUnts).forEach(([unit, spelledOutUnit]) => assert.strictEqual(convertHandler.spellOutUnit(unit), spelledOutUnit, `${spelledOutUnts}' spelled out is invalid'`));
  })

  test("convertHandler should correctly convert L to gal", () => {
    const num = "20";
    let result = math.round(math.divide(math.bignumber(num), math.bignumber(galToL)), 5).toString();
    assert.strictEqual(convertHandler.convert(num, "L").toString(), result, "these numbers are not equel");

  })

  test("convertHandler should correctly convert gal to L", () => {
    const num = "20";
    let result = math.round(math.multiply(math.bignumber(num), math.bignumber(galToL)), 5).toString();
    assert.strictEqual(convertHandler.convert(num, "gal").toString(), result.toString(), "these numbers are not equel");
  })

  test("convertHandler should correctly convert lbs to kg", () => {
    const num = "20";
    let result = math.round(math.multiply(math.bignumber(num), math.bignumber(lbsToKg)), 5).toString();
    assert.strictEqual(convertHandler.convert(num, "lbs").toString(), result, "these numbers are not equel");

  })

  test("convertHandler should correctly convert kg to lbs", () => {
    const num = "20";
    let result = math.round(math.divide(math.bignumber(num), math.bignumber(lbsToKg)), 5).toString();
    assert.strictEqual(convertHandler.convert(num, "kg").toString(), result.toString(), "these numbers are not equel");
  })

  test("convertHandler should correctly convert mi to km", () => {
    const num = "20";
    let result = math.round(math.multiply(math.bignumber(num), math.bignumber(miToKm)), 5).toString();
    assert.strictEqual(convertHandler.convert(num, "mi").toString(), result, "these numbers are not equel");

  })

  test("convertHandler should correctly convert km to mi", () => {
    const num = "20";
    let result = math.round(math.divide(math.bignumber(num), math.bignumber(miToKm)), 5).toString();
    assert.strictEqual(convertHandler.convert(num, "km").toString(), result.toString(), "these numbers are not equel");
  })
});