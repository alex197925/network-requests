/** @format */

/// <reference types="cypress" />

describe("Network Request", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/network-requests");
  });

  it("Get Request", () => {
    // Listening for GET request, that contain  url: "**/comments/*".
    cy.intercept({
      method: "GET",
      url: "**/comments/*",
    }).as("getComment");

    // Clicking on button
    cy.get(".network-btn").click();

    cy.wait("@getComment").its("response.statusCode").should("eq", 200);
  });
});
