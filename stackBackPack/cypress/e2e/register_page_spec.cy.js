describe('Testing home page', () => {
  /*
  it('passes', () => {
    cy.visit('/')
  })
  */

  beforeEach(() => {
    cy.visit("/register")
  })


  it("home page should be visible", () => {
    cy.get("#root").should("be.visible")
  })


  describe("Verify the functions of register form", ()=> {

    it("Verify the functions of register form with correct data",()=> {
      cy.get("[name='username']").type("test")
      cy.get("[name='email']").type("test@test.com")
      cy.get("[name='password']").type("111111")
      cy.get("[name='confirmPassword']").type("111111")
      cy.get("[type='submit']").contains("Register").click()

      cy.url().should("eq", "https://stackbackpack.netlify.app/login")



    })

    it("Verify the functions of register form with uncorrect username. Length  <  3 (username should be 3-15 characters without any special characters)",()=> {
      cy.get("[name='username']").type("te")
      cy.get("[name='email']").type("test2@test.com")
      cy.get("[name='password']").type("111111")
      cy.get("[name='confirmPassword']").type("111111")
      cy.get("[type='submit']").contains("Register").click()

      cy.contains("span", "Username should be 3-15").should("be.visible")
      cy.get("[placeholder='Username']").should('have.css', "border" ,'0.8px solid rgb(255, 0, 0)')
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")

    
      

    })

    it("Verify the functions of register form with uncorrect username. Length  >  3 (username should be 3-15 characters without any special characters)",()=> {
      cy.get("[name='username']").type("testtesttest")
      cy.get("[name='email']").type("test3@test.com")
      cy.get("[name='password']").type("111111")
      cy.get("[name='confirmPassword']").type("111111")
      cy.get("[type='submit']").contains("Register").click()

      cy.contains("span", "Username should be 3-15").should("be.visible")
      cy.get("[placeholder='Username']").should('have.css', "border" ,'0.8px solid rgb(255, 0, 0)')
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")

    
      

    })

    it("Verify the functions of register form with uncorrect username. Special character @ in username (username should be 3-15 characters without any special characters)",()=> {
      cy.get("[name='username']").type("test@")
      cy.get("[name='email']").type("test4@test.com")
      cy.get("[name='password']").type("111111")
      cy.get("[name='confirmPassword']").type("111111")
      cy.get("[type='submit']").contains("Register").click()

      cy.contains("span", "Username should be 3-15").should("be.visible")
      cy.get("[placeholder='Username']").should('have.css', "border" ,'0.8px solid rgb(255, 0, 0)')
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")

    })

    it("Verify the functions of register form with uncorrect email.Email without @ (email should contain  @)",()=> {
      cy.get("[name='username']").type("test")
      cy.get("[name='email']").type("test5test.com")
      cy.get("[name='password']").type("111111")
      cy.get("[name='confirmPassword']").type("111111")
      cy.get("[type='submit']").contains("Register").click()

      cy.contains("span", "Insert valid email").should("be.visible")
      cy.get("[placeholder='Email']").should('have.css', "border" ,'0.8px solid rgb(255, 0, 0)')
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")
    })
    
    it("Verify the functions of register form with uncorrect password. Password length < 6 (Password should be minimum 6 characters long.)",()=> {
      cy.get("[name='username']").type("test")
      cy.get("[name='email']").type("test6@test.com")
      cy.get("[name='password']").type("11111")
      cy.get("[name='confirmPassword']").type("11111")
      cy.get("[type='submit']").contains("Register").click()

      cy.contains("span", "Password should be").should("be.visible")
      cy.get("[placeholder='Password']").should('have.css', "border" ,'0.8px solid rgb(255, 0, 0)')
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")
    })

    it("Verify the functions of register form with uncorrect confirm password. Password != confirm password (Passwords should match.)",()=> {
      cy.get("[name='username']").type("test")
      cy.get("[name='email']").type("test6@test.com")
      cy.get("[name='password']").type("11111")
      cy.get("[name='confirmPassword']").type("111111")
      cy.get("[type='submit']").contains("Register").click()

      cy.contains("span", "Password do not match").should("be.visible")
      cy.get("[placeholder='Confirm password']").should('have.css', "border" ,'0.8px solid rgb(255, 0, 0)')
      cy.url().should("eq", "https://stackbackpack.netlify.app/register")
    })
    
  })





})