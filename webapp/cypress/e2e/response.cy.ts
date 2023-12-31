import { authenticator } from "otplib";

describe("API tests", () => {
  let cookieValues;

  it("/api/login", () => {
    let otpNow = authenticator.generate(Cypress.env("testTotpSecret"));

    // Test account that does not contain any sensitive information
    cy.request({
      method: "POST",
      url: "https://happy-williamson.cloud/api/login",
      body: {
        email: Cypress.env("testEmail"),
        password: Cypress.env("testPassword"),
        otp: otpNow,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      cookieValues = response.headers["set-cookie"][0];

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: "Successful!" });

      // Store cookieValues in an alias
      cy.wrap(cookieValues).as("cookieValues");
    });
  });

  it("/api/profile", function () {
    cy.request({
      method: "GET",
      url: "https://happy-williamson.cloud/api/profile",
      headers: {
        Cookie: this.cookieValues,
      },
    }).then((response) => {
      cookieValues = response.headers["set-cookie"][0];

      expect(response.status).to.equal(200);

      // Store encryptedjwt in an alias
      cy.wrap(cookieValues).as("cookieValues");
    });
  });
});
