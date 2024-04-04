/** @format */

/// <reference types="cypress" />

describe("Network Request", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/network-requests");
  });

  it("Get Request", () => {
    // Listening for GET request, that contain  url: "**/comments/*".
    cy.intercept(
      {
        method: "GET",
        url: "**/comments/*",
      },
      // Mocking Get Request
      {
        body: {
          postId: 1,
          id: 1,
          name: "test name 123",
          email: "test@gmail.com",
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        },
      }
    ).as("getComment");

    // Clicking on button
    cy.get(".network-btn").click();

    cy.wait("@getComment").its("response.statusCode").should("eq", 200);
  });
});
