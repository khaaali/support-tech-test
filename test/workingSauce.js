const { Builder, By, Key, until, WebElement } = require('selenium-webdriver')
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils')

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
* Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
*
* Task II - Comment out the code from Task I. Update the test code so when it runs, 
* the test is able to write "Sauce" in the text box that currently says "I has no focus".
*
* Task III - Update the test code so when it runs, it adds an email to the email field, 
* adds text to the comments field, and clicks the "Send" button.
* Note that email will not actually be sent!
*
* Task IV - Add a capability that adds a tag to each test that is run.
* See this page for instructions: https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
* 
* Bonus: Set the status of the test so it shows as "passed" instead of "complete".
* Use annotations https://docs.saucelabs.com/basics/test-config-annotation/test-annotation/#selenium-javascript-executor
* Or use the already imported node-saucelabs package. For more info see:
* https://github.com/saucelabs/node-saucelabs
*/

describe('Working Sauce', function () {
    it('should go to Google and click Sauce', async function () {
        let driver = await new Builder().withCapabilities(utils.workingCapabilities)
            .usingServer(ONDEMAND_URL).build();


        /**
         * Goes to Sauce Lab's guinea-pig page and verifies the title
         */

        await driver.get("https://saucelabs.com/test/guinea-pig");
        await assert.strictEqual("I am a page title - Sauce Labs", await driver.getTitle());

        // Task I 
        // let link = await driver.findElement(By.id('i am a link'));
        // await link.click();

        // Task II
        let updateTextBox = await driver.findElement(By.id('i_am_a_textbox'));
        await updateTextBox.clear()
        await updateTextBox.sendKeys('Selenium');
        await assert.strictEqual("Selenium", await driver.findElement(By.id('i_am_a_textbox')).getAttribute("value"));


        // Task III
        let email = await driver.findElement(By.id('fbemail'));
        let comments = await driver.findElement(By.id('comments'));
        let sendButton = await driver.findElement(By.id('submit'));
        await email.sendKeys('support@saucelabs.com');
        await assert.strictEqual("support@saucelabs.com", await driver.findElement(By.id('fbemail')).getAttribute("value"));
        await comments.sendKeys('this is a comment');
        await assert.strictEqual("this is a comment", await driver.findElement(By.id('comments')).getAttribute("value"));
        await sendButton.click();

        // TASK IV
        // added property to utils.js

        // Bonus
        // added property to utils.js

        await driver.quit();
    });
});



// Thanks for bringing the issue to our notice.We are glad to investigate and provide a solution.

// Root cause:
// The issue is with the formatting the date and time using javascript on the frontend.

// Why is it appearing:
// As mentioned the website uses OS date and time, it is important to note that OS uses unix timestamp as time keeping. Behaviuor appears if you are using unix timestamp as base for representing date and time on the frontend.

// How to resolve:
// It is advisable that the javascript function which evaluates the data and time should be checked for NaN(not a number)
// before displaying it as human readable format.

// Please modify the date and time function like below to resolve the issue.I have attached some resources for your further reference.


//     Bugfix:

//     function DateTime(UNIX_timestamp) {
//         let dateTime = null
//         let unix = new Date(UNIX_timestamp * 1000);

//         let year = unix.getFullYear();
//         if (isNaN(year))
//             return dateTime
//         let month = unix.getMonth();
//         if (isNaN(month))
//             return dateTime
//         let date = unix.getDate();
//         if (isNaN(date))
//             return dateTime
//         let nowHour = unix.getHours();
//         if (isNaN(nowHour))
//             return dateTime
//         let min = unix.getMinutes();
//         if (isNaN(min))
//             return dateTime

//         let suffix = nowHour >= 12 ? "pm" : "am";
//         nowHour = (suffix == "pm" & (nowHour > 12 & nowHour < 24)) ? (nowHour - 12) : nowHour;
//         nowHour = nowHour == 0 ? 12 : nowHour;
//         dateTime = date + '/' + month + '/' + year + ' ' + nowHour + ':' + min + ' ' + suffix;
//         return dateTime;
//     }





// Resources:
// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
// https://stackoverflow.com/questions/4898574/converting-24-hour-time-to-12-hour-time-w-am-pm-using-javascript
// http://jibbering.com/faq/#parseDate
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN

//  Please let us know how it went with the fix we are happy to support.