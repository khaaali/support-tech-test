const {Builder, By, Key, until} = require('selenium-webdriver')
const utils = require('./utils')

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

describe('Bonus', function () {
    // If its odd, fail the test. 
    // If it is even pass the test
    it('odd & even', async function () {
        // this test works in eu-central-1 or us-west-1
        let driver = await new Builder().withCapabilities(utils.oddEvenCaps)
        .usingServer(ONDEMAND_URL).build();
        await driver.get("https://www.google.com/search?q=random+number");
        let rand_num = await driver.findElement(By.className('gws-csf-randomnumber__result')).getText();
        console.log(rand_num);
        // Now set the test to Passing or Failing 
        // depending on the number's value

        
        await driver.quit();
    });

    it('exception handling', async function () {
        let driver = await new Builder().withCapabilities(utils.exceptionCaps)
        .usingServer(ONDEMAND_URL).build();

        // Handle ANY exceptions that occur with a meaningful 
        // message & the original error.
        // Mark the test as a failure if something breaks.
        await driver.get("https://webglsamples.org/blob/blob.html");
        await driver.findElement(By.id('setSetting3')).click();
        await driver.findElement(By.id('setSetting8')).click();
        await driver.findElement(By.id('setSetting1000')).click();
        await driver.findElement(By.id('setSetting2')).click();
        await driver.findElement(By.id('setSetting8')).click();

        await driver.quit();
    });
});