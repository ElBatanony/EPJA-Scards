const testingMessages = true;
const testingScards = true;
const testingStudyNotes = true;

describe("Full app testing", function () {
  it("Everything works", function () {
    cy.visit("/scards");

    cy.get("#welcomeToScards")
      .invoke("text")
      .should("match", /Welcome to Scards!/);

    if (testingMessages) {
      cy.get("#MsgText")
        .invoke("text")
        .should("match", /Welcome! This is message1/);

      cy.get("#NextMsgBtn").click();
      cy.get("#NextMsgBtn").click();
      cy.get("#NextMsgBtn").click();
      cy.get("#PrevMsgBtn").click();

      cy.get("#MsgText")
        .invoke("text")
        .should("match", /Adventerous, aren't we\?/);
    }

    if (testingScards) {
      cy.get(".ScardCard").should("have.length", 5);

      cy.get("#addScardBtn").click();
      cy.get("#newScardQuestion").type("Question 6");
      cy.get("#newScardAnswer").type("Answer 6");
      cy.get("#ScardDialogActionBtn").click();
      cy.get(".ScardCard").should("have.length", 6);

      cy.get(".ScardCard").eq(5).click();
      cy.get("#EditScardBtn").click();
      cy.get("#newScardQuestion").type(" updated");
      cy.get("#newScardAnswer").type(" updated");
      cy.get("#ScardDialogActionBtn").click();
      cy.get("#backBtn").click();
      cy.wait(350);

      cy.get(".ScardQ")
        .eq(5)
        .invoke("text")
        .should("match", /Question 6 updated/);
      cy.get(".ScardCard").eq(5).click();
      cy.get("#DeleteScardBtn").click();
    }

    if (testingStudyNotes) {
      cy.get("#StudyNotesTextField").clear().type("New Study Notes");
      cy.get("#SaveStudyNotes").click();
      cy.get("#StudyNotesTextField").clear();
      cy.get("#LoadStudyNotes").click();
      cy.get("#StudyNotesTextField")
        .invoke("text")
        .should("match", /New Study Notes/);
    }
  });
});
