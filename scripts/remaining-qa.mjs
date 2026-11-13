import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));

// Voices carousel (desktop)
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2800));
const voices = await page.$(".voices");
const vy = await page.evaluate((el) => el.getBoundingClientRect().top + window.scrollY, voices);
await page.evaluate((y) => window.scrollTo(0, y - 20), vy);
await new Promise((r) => setTimeout(r, 1000));
const quote1 = await page.evaluate(() => document.querySelector(".voices__quote")?.textContent?.slice(0, 40));
await page.click(".voices__nav button:last-child");
await new Promise((r) => setTimeout(r, 900));
const quote2 = await page.evaluate(() => document.querySelector(".voices__quote")?.textContent?.slice(0, 40));
const counter = await page.evaluate(() => document.querySelector(".voices__count")?.textContent);
console.log("voices:", { quote1, quote2, counter });

// Footer desktop
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: ".shots/final-footer.png" });

// Mobile footer + voices
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2500));
const mVoices = await page.$(".voices");
const mvy = await page.evaluate((el) => el.getBoundingClientRect().top + window.scrollY, mVoices);
await page.evaluate((y) => window.scrollTo(0, y - 10), mvy);
await new Promise((r) => setTimeout(r, 1000));
await page.screenshot({ path: ".shots/final-m-voices.png" });
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: ".shots/final-m-footer.png" });

// Tiny menu
await page.setViewport({ width: 320, height: 568, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2200));
await page.click(".menu-toggle");
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: ".shots/final-menu-320.png" });
console.log(
  "tiny menu:",
  await page.evaluate(() => {
    const body = document.querySelector(".menu__body");
    return {
      scrollHeight: body?.scrollHeight,
      clientHeight: body?.clientHeight,
      overflowY: body ? getComputedStyle(body).overflowY : null,
      docOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  }),
);

await browser.close();
console.log("remaining qa done");