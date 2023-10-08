describe('Testing home page', () => {
  /*
  it('passes', () => {
    cy.visit('/')
  })
  */

  beforeEach(() => {
    cy.visit("/")
  })


  it("home page should be visible", () => {
    cy.get("#root").should("be.visible")

  })



  describe("All parts of header should be visible", () => {
    it("navbar should be visible", () => {
      cy.get("header").should("be.visible")
    })

    it("main heading should be visible", () => {
      cy.contains("h1", "StackBackPack").should("be.visible")
    })

    it("home login and register button should be visible", () => {
      cy.get("#home, #login, #register").should("be.visible")
      //cy.get("#login").should("be.visible")
      //cy.get("#register").should("be.visible")
    })

  })

  describe("All parts of main-home-container should be visible", () => {
    it("main-home-container should be visible", () => {
      cy.get(".main-home-container").should("be.visible")
    })

    it("main-home-container heading should be visble", () => {
      cy.contains("h2", "Hi! this app will help you keep track of the weight of your hiking gear.").should("be.visible")
    })

    it("main-home-container image should be visible", () => {
      cy.get("[src='./assets/stb-mini.png']").should("be.visible")
    })

    it("main-home-container app describe should be visible and have length of 4 and contains correct string", () => {
      cy.get("ul").should("be.visible")

      cy.get("ul > li").should(($li) => {
        expect($li).to.have.length(4)

        expect($li.eq(0)).to.contain("Register")
        expect($li.eq(1)).to.contain("Login")
        expect($li.eq(2)).to.contain("Create list")
        expect($li.eq(3)).to.contain("Share it")
      })
    })


  })

  describe("Verify the functionality of buttons in navbar", () => {
    it("Verify the functionality of login button in navbar", () => {
      cy.get("#login").click()
      cy.url().should("eq", "https://stackbackpack.netlify.app/login")
    })

    it("Verify the functionality of register button in navbar", () => {
      cy.get("#register").click()
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")
    })

    it("Verify the functionality of register button in navbar", () => {
      cy.get("#home").click()
      cy.url().should("eq", "https://stackbackpack.netlify.app/")
      console.log(cy.url())

    })
/*
    it.only("Verify the functionality of github link in the footer", () => {
      cy.get("[href='https://github.com/mgaidos/StackBackPack']").invoke("removeAttr", "target")
      cy.get("[href='https://github.com/mgaidos/StackBackPack']").click()

      cy.url().should('eq', 'https://github.com/mgaidos/StackBackPack')

    })
*/
  })






})