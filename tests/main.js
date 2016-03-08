module.exports = {
    'main test' : function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 2000)
            .setValue('input.location', 'london')
            .click('.btn-search')
            .waitForElementVisible('.carousel .title h2', 3000)
            .assert.containsText('.carousel .title h2', 'Hampstead Heath')
            .end();
    }
};