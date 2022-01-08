const cenas = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

(async function start() {

 var options = new firefox.Options()
 let profile = '/Users/pedro.piloto/Library/Application Support/Firefox/Profiles/q7i59rp8.default-release';
 options.setProfile(profile)

 let driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();

 try {

  let elements
  let btn

  for (let i = 0; i < 30; i++) {

   await driver.get('https://magiceden.io/launchpad');

   await driver.wait(until.elementLocated(By.className('launch-pad__mint')), 5 * 1000000)

   elements = await driver.findElements(By.className("launch-pad__mint"))
   btn = await elements[0].findElements(By.xpath("./child::*"));
   await driver.executeScript("arguments[0].click();", btn[0])

   await driver.switchTo().newWindow('tab');
  }
 } finally {
  //await driver.quit();
 }
})();