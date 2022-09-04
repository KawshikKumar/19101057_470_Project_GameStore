const User = require('../../model/userModel');
const server = require('../../server');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { before, describe } = require('mocha');


chai.use(chaiHttp);
 
//1.login
describe("User", () => {

   let _id;
 
describe("Login", () => {
    it("should login", (done) => {

      let body = {
        "email":"kawshik565@gmail.com",
        "password":"1234"
      };

      
      
      chai.request(server)
        .post('/api/v1/login')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          _id = res.body._id;
          done();
        });
    });

 });
 //2.register
 describe("Register", () => {
    it("should register", (done) => {

      let body = {
        "name":"abir",
        "email":"kawhihg.565@gmail.com",
        "password":"1234"
      };

      
      
      chai.request(server)
        .post('/api/v1/register')
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          _id = res.body._id;
          done();
        });
    });

 });
 //3.logout
 describe("logout", () => {
    it("should logout", (done) => {   
      chai.request(server)
        .get('/api/v1/logout')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

 });
 //4.User details
 describe("Get user", () => {
    it("should get user", (done) => { 
        
        let body = {
            "id":"6314bc9e8e204262b4a73430",
          };

      chai.request(server)
        .get('/api/v1/me')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

 });
//5. Update user details
 describe("Update user", () => {
    it("should update user", (done) => { 
        
        let body = {
            "id":"6314bc9e8e204262b4a73430",
            "name":"kawshik kumar",
            "email":"kawshiickikk.564@gmail.com"
          };

      chai.request(server)
        .put('/api/v1/me/update')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

 });

 //6. Get all user details
 describe("Get all user", () => {
    it("should get user", (done) => { 
        

      chai.request(server)
        .get('/api/v1/admin/users')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

 });
});

