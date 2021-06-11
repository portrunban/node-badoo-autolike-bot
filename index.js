const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

(async () => {
  const login = process.env.LOGIN;
  const pass = process.env.PASSWORD;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1000, height: 1000 },
    args: ['--window-size=1000,1000'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto('https://badoo.com/signin/?f=top');
  await page.type('.js-signin-login', login);
  await page.type('.js-signin-password', pass);
  await page.click('.btn--block');
  while (true) {
    await page.waitForSelector('.js-profile-header-vote-yes');
    await page.click('.js-profile-header-vote-yes');
    await page.waitForTimeout(2000);
    let crossLike = await page.$('.ovl-match');
    if (crossLike) {
      await page.click('.icon.icon--white.js-ovl-close');
      await page.waitForTimeout(2000);
    }
    const pushAlert = await page.$('.js-chrome-pushes-deny');
    if (pushAlert) {
      await page.click('.js-chrome-pushes-deny');
    }
    // GET SCREENSHOT PAGE IF EXIST DESCRIPTION
    // let profileName = await page.$eval('.profile-header__name', (e) => e.innerText);
    // let profileAge = await page.$eval('.profile-header__age', (e) => e.innerText);
    // let profileAboutMe = await page.$(".profile-section__txt-line[dir]");
    // if (profileAboutMe) {
    //   await page.screenshot({
    //     path: `./data/photo/${profileName}-${profileAge.replace(
    //       /,\s/,
    //       ""
    //     )}-${Date.now()}.png`,
    //     type: "png",
    //   });
    //   console.log('скрин');
    // }
  }
})();
