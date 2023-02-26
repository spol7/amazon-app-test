# About

# Assumptions and limitations

The following test suite is designed to perform end-to-end test in Amazon Application via Android device.

The test suite is written on javascript (node.js) using Appium and webdriver.io.

## Test scenario

1. Open Amazon App
2. Open Sign In screen
3. Enter credentials: email and password
4. Search for "TV" using the search box
5. Select the first result, open its page and add it to the shopping cart
6. Open the cart box and verify that the product has been added
7. Save the operations report in a file (as a log) 

# Installation

## Requiremenets

The test suite is build using

* Appium Server v.2.0
* node.js v.19
* Android SDK (for Android 11 device)
* Java (OpenJDK v.19.0)
* webdriver.io v.8.3

### Local setup

### Appium

Install Appium server following the instructions on the github: https://github.com/appium/appium

``npm install -g appium@next``

### Android Studio

Download link: https://developer.android.com/studio

###
You need to have java virtual machine installed.
E.g. openjdk: https://openjdk.org/install/ v.19.0. works well with the tools.

### Appium Drivers

To be able to perform UI tests automation, you have to install extra drivers:
``appium driver install uiautomator2``


## Configuration

``./config.js`` contains a sensitive data, such as credentials to Amazon account. Please save them there before running tests.

## Debugging tools

Appium inspector is very handy to check the output on the mobile device and analyze the DOM structure of the app.
https://inspector.appiumpro.com/

## Install the dependencies

``npm install``

# Running tests

You can execute the test suite using the following command:
``node --test-reporter-destination=execution.log --test-reporter=tap  --test test-suite.js``

It will run the test and save the output into (./execution.log) file.
You may also use the simpler command, to see the log output:

``node --test test-suite.js``

# Artifacts

Test report + execution log:
``./execution.log``
