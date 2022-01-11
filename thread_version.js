const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

function performTask() {
  return new Promise(resolve => {
      (async function start() {
	  const TABS_NUMBER = 20;

	  var options = new firefox.Options()
	  let profile = '/Users/prvs/Library/Application Support/Firefox/Profiles/f5x73anr.default-release';
	  options.setProfile(profile)

	  let driver = new Builder()
	      .forBrowser('firefox')
	      .setFirefoxOptions(options)
	      .build();

	  try {
	      let elements
	      let btns
	      let btn

	      await driver.get('https://magiceden.io/launchpad');
	
	      await driver.wait(until.elementLocated(By.className('launch-pad__mint')), 5 * 1000000)
	      //trick -> magiceden should trigger phantom popup to insert the password at this moment. After inserting the password it should be automatically
	      //----Open tabs upfront to prevent waste of time during mint----
	      for (let i = 0; i < TABS_NUMBER; i++) {
		  await driver.switchTo().newWindow('tab');
		  await driver.get('https://magiceden.io/launchpad');
	      }

	      let tabsList = await driver.getAllWindowHandles()

	      //----Wait for the mint button to be enabled----
	      for (let i = 0; i < TABS_NUMBER; i++) { 
		  await driver.switchTo().window(tabsList[i]);
		  elements = await driver.findElements(By.className("launch-pad__mint"))
		  btns = await elements[0].findElements(By.xpath("./child::*"));
		  btn = btns[0]
		  console.log('button enabled:', await btn.isEnabled())
		  await driver.wait(until.elementIsEnabled(btn), 5 * 1000000)
		  await driver.executeScript("arguments[0].click();", btn)
	      }
	  } finally {
	      //await driver.quit();
	  }
      })();

  });
}

(async () => {
    // Open Three Browsers
    const allTasks = [
	performTask(),
	performTask(),
	performTask(),
    ];    
    await Promise.all(allTasks);
})();
