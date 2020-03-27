const request = require("supertest");
const server = require("./server");

describe("To assure Server is alive", function() {
  describe("GET /", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/")
        .expect(200);
    });
    it("should return JSON", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it('should respond with {message: "this is the message to show it works!"}', function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.message).toBe(
            "this is the message to show it works!"
          );
        });
    });
  });
});

const username = "faby" +new Date().toString();
describe("To assure register is alive", function() {
  describe("POST /register should", function() {
    it("return User object if req is successful", function() {      
      return request(server)
        .post("/api/auth/register")
        .send({
            username: username,
            password: "12345"
        })
        .expect(200)
        .then((res) => {
            expect(res.body.username).toBe(username);
        });
    });
  });
  describe("POST /register should", function() {
    it("return error if username is not unique", function() {      
      return request(server)
        .post("/api/auth/register")
        .send({
            username: username,
            password: "12345"
        })
        .expect(500);
    });
  });
});

describe("To assure login is alive", function() {
    describe("POST /login", function() {
      it("should return welcome message when logged in", function() {      
        return request(server)
          .post("/api/auth/login")
          .send({
              username: username,
              password: "12345"
          })
          .expect(200)
          .then((res) => {
              expect(res.body.message).toBe(`Welcome ${username}`);
          });
      });
    });
    describe("POST /login returns error if username is not unique", function() {
      it("should return error if the password is wrong", function() {      
        return request(server)
          .post("/api/auth/login")
          .send({
              username: username,
              password: "123456"
          })
          .expect(500);
      });
    });
  });
