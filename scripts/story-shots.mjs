import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2600));
const storyTop = await page.evaluate(() => document.querySelector(".story").getBoundingClientRect().top + window.scrollY);
for (const offset of [100, 500, 900, 1300, 1700, 2100]) {
  await page.evaluate((y) => window.scrollTo(0, y), storyTop + offset);
  await new Promise((r) => setTimeout(r, 1200));
  const state = await page.evaluate(() => ({
    count: document.querySelector("[data-story-count]")?.textContent,
    panels: Array.from(document.querySelectorAll(".story__panel")).map((p) => Number(getComputedStyle(p).opacity).toFixed(2)),
    scenes: Array.from(document.querySelectorAll(".story__scene")).map((p) => Number(getComputedStyle(p).opacity).toFixed(2)),
  }));
  console.log(offset, JSON.stringify(state));
  await page.screenshot({ path: `.shots/story-${offset}.png` });
}
await browser.close();
