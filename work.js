const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const start = async (worker, launchpadUrl, profilePath, tabsNumber) => {
    console.log(`${worker} -> starting`)
    var options = new chrome.Options()
    options.addArguments("profile-directory=Default")
    options.addArguments("user-data-dir="+profilePath)
    /*options.excludeSwitches('disable-hang-monitor',
      'disable-prompt-on-repost',
      'disable-background-networking',
      'disable-sync',
      'disable-translate',
      'disable-web-resources',
      'disable-client-side-phishing-detection',
      'disable-component-update',
      'disable-default-apps',
      'disable-zero-browsers-open-for-tests',
      'allow-pre-commit-input','disable-popup-blocking', 'enable-automation',  'enable-blink-features', 'enable-logging','log-level', 'no-first-run', 'no-service-autorun', 'password-store', 'remote-debugging-port','test-type', 'use-mock-keychain' )*/
    options.excludeSwitches("disable-popup-blocking", "enable-automation"); 
    //options.addArguments("--enable-extensions");
    options.addArguments ("start-maximized");
    options.addArguments("--disable-blink-features=AutomationControlled");
    options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")    



    let driver = new Builder()
	.forBrowser('chrome')
	.setChromeOptions(options)
	.build();

    try {

	let elements
	let btns
	let btn

	await driver.get(launchpadUrl);

	await driver.wait(until.elementLocated(By.className('PlainButton_btn__24zB_')), 5 * 1000000)
	//trick -> magiceden should trigger phantom popup to insert the password at this moment. After inserting the password it should be automatically

	//----Open tabs upfront to prevent waste of time during mint----
	for (let i = 0; i < tabsNumber; i++) {

	    await driver.switchTo().newWindow('tab');
	    await driver.get(launchpadUrl);
	}

	let tabsList = await driver.getAllWindowHandles()

	//----Wait for the mint button to be enabled----
	for (let i = 0; i < tabsNumber; i++) {
	    await driver.switchTo().window(tabsList[i]);
	    
	    elements = await driver.findElements(By.className("PlainButton_btn__24zB_"))
	    if (elements && elements[0]) {
		btn = elements[0]
		console.log(`${worker} -> button enabled: ${await btn.isEnabled()}`)
		await driver.wait(until.elementIsEnabled(btn), 5 * 1000000)
		await driver.executeScript("arguments[0].click();", btn)
	    } else {
		console.log(`${worker} -> No button. Skipping tab.`)
	    }
	}
    } finally {
	//await driver.quit();
    }
}

module.exports = start
