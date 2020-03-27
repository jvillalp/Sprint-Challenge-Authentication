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

describe("To assure register is alive", function() {
  describe("POST /register", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/register")
        .expect(200);
    });
  });
});
