module.exports = {
    beforeEach: function (browser) {
        let pageObjects = browser.page.pageObjects()
        pageObjects.navigate()
    },
    after: function (browser) {
        browser.end()
    },
    //This test changes the name on the employee card and makes sure that changes are reflected on the employee list
    'Name Change': function (browser) {
        let pageObjects = browser.page.pageObjects()
        pageObjects
            .waitForElementVisible('@testEmployee2', 5000)
            .click('@testEmployee2')
            .clearValue('@nameInput')
            .setValue('@nameInput', "Rick")
            .click('@saveButton')
            .expect.element('@testEmployee2').text.to.contain("Rick")
    },
    //This test will make sure that an error message shows up becasue there is an invalid field
    'Error messages': function (browser) {
        let pageObjects = browser.page.pageObjects()
        pageObjects
            .waitForElementVisible('@testEmployee1', 5000)
            .click('@testEmployee1')
            .clearValue('@nameInput')
            .setValue('@nameInput', ' \uE003')
        browser.pause(5000)
        pageObjects
            .click('@saveButton')
            .expect.element('@errorCard').to.be.visible
    },
    //This test will create a valid entry and add an employee
    'Valid Employee': function (browser) {
        let pageObjects = browser.page.pageObjects()
        pageObjects
        .waitForElementVisible('@addEmployee', 5000)
        .click('@addEmployee')
        .waitForElementVisible('@newEmployee', 5000)
        .click('@newEmployee')
        .waitForElementVisible('@nameInput', 5000)
        .clearValue('@nameInput')
        .setValue('@nameInput', 'Neil Armstrong')
        .clearValue('@phoneInput')
        .setValue('@phoneInput', '8019111234')
        .clearValue('@emailInput')
        .setValue('@emailInput', 'spaceman@nasa.com')
        .clearValue('@titleInput')
        .setValue('@titleInput', 'Moonman')
        .click('@saveButton')
        .waitForElementVisible('@newEmployee', 5000)
        .expect.element('@newEmployee').text.to.contain("Neil Armstrong")
    }
}