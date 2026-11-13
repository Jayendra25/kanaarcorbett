import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2600));

await page.click('.site-nav a[href="#stays"]');
await new Promise((r) => setTimeout(r, 2200));
console.log("anchor stays:", await page.evaluate(() => ({ y: Math.round(window.scrollY), top: Math.round(document.querySelector("#stays").getBoundingClientRect().top) })));

const storyTop = await page.evaluate(() => document.querySelector(".story").getBoundingClientRect().top + window.scrollY);
for (const offset of [300, 1200, 2200]) {
  await page.evaluate((y) => window.scrollTo(0, y), storyTop + offset);
  await new Promise((r) => setTimeout(r, 1300));
  console.log(offset, await page.evaluate(() => ({ count: document.querySelector("[data-story-count]")?.textContent, activePanel: Array.from(document.querySelectorAll(".story__panel")).findIndex((p) => Number(getComputedStyle(p).opacity) > 0.5), activeScene: Array.from(document.querySelectorAll(".story__scene")).findIndex((p) => Number(getComputedStyle(p).opacity) > 0.5) })));
}

await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2200));
await page.click(".hero__actions .btn");
await new Promise((r) => setTimeout(r, 2200));
console.log("hero cta:", await page.evaluate(() => ({ y: Math.round(window.scrollY), hotelTop: Math.round(document.querySelector("#hotel").getBoundingClientRect().top) })));
await browser.close();
