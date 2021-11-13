const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test("valid input: GET request to /api/convert", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=20L")
            .end((err, res) => {
                if(err)
                  console.log(err);
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.initNum, "20");
                assert.equal(res.body.initUnit, "L");
                assert.equal(res.body.returnNum, "5.28344");
                assert.equal(res.body.returnUnit, "gal");
                assert.equal(res.body.string, "20 liters converts to 5.28344 gallons");
                done();
            })
    })
    test("invalid unit input: GET request to /api/convert", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=20g")
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body, "invalid unit");
                done();
            })
    })
    test("invalid number input: GET request to /api/convert", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=20/3.3/2mi")
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body, "invalid number");
                done();
            })
    })
    test("invalid unit AND number input: GET request to /api/convert", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=20/2/2gram")
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body, "invalid number and unit");
                done();
            })
    })
    test("convert with no numbers such as 'kg': GET request to /api/convert", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=kg")
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.equal(res.body.initNum, "1");
                assert.equal(res.body.initUnit, "kg");
                assert.equal(res.body.returnNum, "2.20462");
                assert.equal(res.body.returnUnit, "lbs");
                assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
                done();
            })
    })
});
