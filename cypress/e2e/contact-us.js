///<reference types= "Cypress"/>

/* beforeEach(() => {
    cy.visit("http://www.webdriveruniversity.com/")
}) */
describe("Test Contact Us via Webdriveruni", ()=>{
//directly going to contact us page 
    it("Should be able to submit a successful submission", ()=>{

        cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html")
        cy.get("input[placeholder='First Name']").type("Joe")
        cy.get("input[placeholder='Last Name']").type("Robert")
        cy.get ("input[placeholder='Email Address']").type("johnrobert@gmail.com")
        cy.get("textarea[placeholder='Comments']").type("Hy My Name is Maira and I'm working at Uworx")
        cy.get("input[value='SUBMIT']").click()
        cy.get('h1').should('have.text' , "Thank You for your Message!")

    })
//checking title of the page
    it("Should not be able to submit a successful submission", ()=>{
        cy.visit("http://www.webdriveruniversity.com/")
        cy.title().should('eq',"WebDriverUniversity.com")
    })
//selector
    it("Selectors", ()=>{
        cy.visit("https://automationteststore.com/")
        cy.get('#filter_keyword').type("Makeup")
        cy.get('.button-in-search > .fa').click()
        //cy.get (".input-group> #keyword").should('have.value', 'Makeup');
        cy.get (".input-group> #keyword").should("exist").contains('Makeup');
        //cy.get('.logo > img').should('be.visible')
        //.and('exist')

    })
//assertions -should , and 
     it("Implicit Assertions", ()=>{
        cy.url().should('include',"http://www.webdriveruniversity.com/" )
        cy.url().should('eq',"http://www.webdriveruniversity.com/" )
        cy.url().should('contain',"http://www.webdriveruniversity.com/" )
        //rather than writing writing separate assertions we can use "and" like this
        cy.url().should('include',"http://www.webdriveruniversity.com/" )
        .and('eq',"http://www.webdriveruniversity.com/" )
        .and('contain',"http://www.webdriveruniversity.com/" )
     })
     it("Click on contact us on footer" , ()=>{
        cy.visit("https://automationteststore.com/")
        cy.get("a[href='https://automationteststore.com/index.php?rt=content/contact']").click()
        cy.get('#ContactUsFrm_first_name').type("Maira")
        cy.get('#ContactUsFrm_email').type("mairanawaz98@gmail.com")
        cy.get('#ContactUsFrm_email').should('have.attr', 'name' , 'email')
        cy.get('#ContactUsFrm_enquiry').type("I haven't recieved my parcel")
        cy.get('.col-md-6 > .btn').click()
        cy.get (".mb40 > :nth-child(3)").should('have.text', "Your enquiry has been successfully sent to the store owner!")

     })

//radio buttons and checkboxes
     it("Radio Buttons and Checkboxes", ()=>{
        cy.visit("http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html")
        //cy.get(".radio-buttons > [value='yellow']").click()
        cy.get(".radio-buttons > [value='yellow']").check().should('be.checked')
        //cy.get(".radio-buttons > [value='yellow']").check().should('not.be.checked') //negative test
        //uncheck don't work on radio buttons 
        //checkboxes
        cy.get('.section-title input[value="option-1"]').should("be.visible") //present or not
       // cy.get("#checkboxes > :nth-child(1)").check().should('be.checked')
        cy.get('.section-title input[value="option-1"]').check().should('be.checked');
        // the checkboxes are inside <label> elements, and they don't have a direct parent-child relationship with the .section-title element. Therefore, using > (child combinator) in the selector might not be appropriate.
        cy.get('.section-title input[value="option-3"]').uncheck().should('not.be.checked');


    


        //selecting all the checkboxes
        cy.get("input[type='checkbox']").check().should("be.checked")

        //.first and .last can be used to select first and last checkbox
     })

     it("DropDowns ", ()=>{
        //we use select for dropdown 
        //.type('{enter}')
        cy.visit("http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html")
        cy.get ( ".section-title > #dropdowm-menu-1").select("C#")
        .should('have.value', "c#")
        cy.get(".section-title > #dropdowm-menu-1").click(); // its not clicking 

        cy.visit("https://www.wikipedia.org/")
        cy.get("#searchInput").type("Delhi")
        cy.get('.suggestion-title').contains("Delhi University").click();
     })

     it.only("Dynamic Dropdown", ()=>{
        cy.visit("https://www.google.com/")
        cy.get ("#APjFqb").type("cypress automation") // searching
        //capture all options 
        //count total number of options
        cy.get(".wM6W7d> span").each(($el ,index , $list)=>{
            if($el.text()== "cypress automation tutorial")
            {
                cy.wrap($el).click()

            }
        })

     })

     it("Alerts", ()=>{
        //1.javascript alerts : it will have some text and a "OK" button
        //2.javascript confirm alerts : it will have some text with "OK" and "Cancel" button
        //3. javascript Prompt alert : it will have some text with textboxes for user input along  with "ok"
        //4.authentictad alert
        //cypress automatically handles alert window but for validations on alert window you have to write code
        //so we have to triger "event"

               //JavaScript Alert
        cy.visit("http://www.webdriveruniversity.com/Popup-Alerts/index.html")
        cy.get(".section-title > #button1").click()  //can't see alert window because it is handled by cypress
        //in order to validate text inside alert window 
        cy.on("window:alert", (t)=>{
            expect(t).to.contains("I am an alert box!")
        })


              //js Confirm Alert
        cy.get(".section-title >#button4").click() //by default cypress clicks on ok button
        cy.on("window:confirm", (t)=>{
            expect(t).to.contains("Press a button!")
        })
        //for cancel button
        cy.get(".section-title >#button4").click() 
        cy.on("window:confirm",()=> false )

        cy.get("#confirm-alert-text").should("have.text", "You pressed Cancel!")
        })
})