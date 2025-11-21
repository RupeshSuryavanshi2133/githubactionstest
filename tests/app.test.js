const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");

describe("GET /", () => {
  test("returns users from dummyjson (mocked)", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        users: [
          { id: 1, firstName: "Test", lastName: "User", email: "test@example.com" },
        ],
        total: 1,
        skip: 0,
        limit: 30,
      },
    });

    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body.users.length).toBe(1);
    expect(res.body.users[0].email).toBe("test@example.com");
  });
});

describe("GET /health", () => {
  test("returns ok message", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Server is up ✅");
  });
});
