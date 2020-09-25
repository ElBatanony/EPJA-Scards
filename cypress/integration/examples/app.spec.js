describe("Simple testing", function () {
  it("just works", function () {
    cy.visit("/scards");

    cy.get("#welcome")
      .invoke("text")
      .should("match", /Welcome to Scards!/);
  });
});
