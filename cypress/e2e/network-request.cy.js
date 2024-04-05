/** @format */

/// <reference types="cypress" />

describe("Network Request", () => {
  let message = "Page cannot found!!";
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
  it("Post Request", () => {
    cy.intercept("POST", "/comments").as("postComment");

    cy.get(".network-post").click();

    cy.wait("@postComment").should(({ request, response }) => {
      //console.log(request);

      // RESPONSE
      expect(request.body).to.include("email");

      console.log(response);

      expect(response.body).to.have.property(
        "name",
        "Using POST in cy.intercept()"
      );

      // REQUEST
      expect(request.headers).to.have.property("content-type");
      expect(request.headers).to.have.property(
        "origin",
        "https://example.cypress.io"
      );
    });
  });
  it.only("PUT Request", () => {
    cy.intercept(
      {
        method: "PUT",
        url: "**/comments/*",
      },
      {
        statusCode: 404,
        body: { error: message },
        headers: { "access-control-allow-origin": "*" },
        delay: 500,
      }
    ).as("putComment");

    cy.get(".network-put").click();
    cy.wait("@putComment");

    cy.get(".network-put-comment").should("contain", message);
  });
});
