const {remote, Key} = require('webdriverio');
const { config } = require('./config');
const { scrollDown } = require('./src/helper.js');
const { describe } = require ('node:test');
const assert = require('node:assert/strict');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.amazon.mShop.android.shopping',
  'appium:appActivity': 'com.amazon.mShop.home.HomeActivity',
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities
};

describe('Amazon Android App E2E Test', async () => {
      
    const driver = await remote(wdOpts);
          
    try {
      
        const email = config.credentials.email;
        const password = config.credentials.password;

        console.log('sign-in button');
        const signInButton = await driver.$('//*[@text="Already a customer? Sign in"]');
        await signInButton.click();

        console.log('already a customer - radio-button');
        const signInRadio = await driver.$('//*[@text="Sign in. Already a customer?"]');
        await signInRadio.click();

        console.log('enter email');
        const emailField = await driver.$('//*[@resource-id="ap_email_login"]');
        await emailField.setValue(email);

        const continueButton = await driver.$('//*[@resource-id="continue"]');
        await continueButton.click();

        console.log('enter password');
        const passwordField = await driver.$('//*[@resource-id="ap_password"]');
        await passwordField.setValue(password);
        

        const signInSubmitButton = await driver.$('//*[@resource-id="signInSubmit"]');
        await signInSubmitButton.click();

        await driver.pause(3000);  

        console.log('click the search bar');
        const searchBar = await driver.$('(//android.widget.LinearLayout[@content-desc="Search"])[1]/android.widget.LinearLayout/android.widget.TextView');
        await searchBar.click();

        console.log('type the search in');
        const searchInput = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText');
        await searchInput.setValue('TV');

        console.log('press enter');
        await driver.pressKeyCode(66);

        await driver.pause(1000);

        console.log('accept cookies');
        const cookiesAccept = await driver.$('//*[@text="Accept Cookies"]');
        if (await cookiesAccept.isExisting()) {
            await cookiesAccept.click();
        }
        await driver.pause(1000);
        
        console.log('get the 1st search result');
        const productSearchResultItems = await driver.$$('//android.view.View[@hint="product-detail"][@clickable="true"]');
        await scrollDown(driver);

        await productSearchResultItems[1].click();

        await driver.pause(1000);
      
        const productTitleEl = driver.$('//*[@resource-id="title_feature_div"]/android.view.View');
        const productTitle = await productTitleEl.getText();
        assert.notEqual(productTitle, '');
        console.log('The selected product: ' + productTitle);

        console.log('find and click the add-to-cart button');
        var addToCartButton = await driver.$('//*[@resource-id="add-to-cart-button"]');
        while (!await addToCartButton.isExisting()) {
            console.log('scrolling');
            await scrollDown(driver);
            await driver.pause(1000);
            if (await addToCartButton.isExisting()) {
                console.log('adding to cart');
                await addToCartButton.click();
                break;
            } 
            
            const ProductCartElement = driver.$('//android.view.View[@resource-id="a-page"]');
            assert.equal(await ProductCartElement.isExisting(), true);
        }
        if (await addToCartButton.isExisting()) {
            await addToCartButton.click();
        } 

        await driver.pause(1000);

        console.log('close the dialog with extras');
        const extraDialogDoneButton = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.app.Dialog/android.widget.TextView[2]');
        if (await extraDialogDoneButton.isExisting()) {
            await extraDialogDoneButton.click();
        }

        await driver.pause(1000);

        console.log('open the cart');
        const cartIcon = await driver.$('//*[@resource-id="com.amazon.mShop.android.shopping:id/cart_count"]');
        if (await cartIcon.isExisting()) {
            await cartIcon.click();
        }
        
        await driver.pause(1000);
        const shortProductTitle = productTitle.substring(0, 20);
        const titleElement = await driver.$('//*[contains(@text, "' + shortProductTitle + '")]');
        assert.equal(await titleElement.isExisting(), true, shortProductTitle + ': unable to find the title on the checkout page');
    
    } finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }

});