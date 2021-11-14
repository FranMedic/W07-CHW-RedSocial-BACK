const jwt = require("jsonwebtoken");
const auth = require("./auth");

jest.mock("jsonwebtoken");

describe("Given an auth middleware", () => {
  describe("When it gets a request with an incorrect Authozization header", () => {
    test("then it should invoke the next function with an error with a message and a status code 401", () => {
      const req = {
        header: jest.fn(),
      };
      const next = jest.fn();

      const error = new Error("Not authorized");
      error.code = 401;

      auth(req, null, next);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it gets a request with an authorization header but a without a token", () => {
    test("then it should invoke the next function with a message `Token is missing` and an status 401", () => {
      const authHeader = "EZTOYAUTORIZADO";

      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };
      const next = jest.fn();
      const error = new Error("Token is missing...");
      error.code = 401;

      auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it gets a request with an Authorization header but with an inconrrect token", () => {
    test("Then it should send an error with a message 'Wrong token' and an status 401", async () => {
      const req = {
        json: jest.fn(),
        header: jest.fn().mockReturnValue("Bearer token"),
      };

      const next = jest.fn();

      const error = new Error("Wrong token");
      error.code = 401;

      jwt.verify = jest.fn().mockRejectedValue(false);

      await auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it gets an Authorization header and a correct token ", () => {
    test("Then it should assign to the properties of the req, the value of the user  ", async () => {
      const req = {
        header: jest.fn().mockReturnValue("Bearer token"),
        userId: "",
        userName: "",
      };
      const next = jest.fn();

      const userData = {
        id: "1234",
        name: "patata",
      };
      jwt.verify = jest.fn().mockResolvedValue(userData);

      await auth(req, null, next);

      expect(req.userId).toBe(userData.id);
      expect(req.userName).toBe(userData.name);
    });
  });
});
