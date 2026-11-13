import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const width = Number(process.argv[2] ?? 1440);
const height = Number(process.argv[3] ?? 1000);
const suffix = process.argv[4] ?? "";
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/?intro=1", { waitUntil: "networkidle2" });

const marks = [700, 1500, 2400, 3300, 4200, 5200];
let previous = 0;
for (const mark of marks) {
  await new Promise((resolve) => setTimeout(resolve, mark - previous));
  previous = mark;
  await page.screenshot({ path: `.shots/intro-${mark}${suffix}.png` });
}

const state = await page.evaluate(() => ({
  intro: document.documentElement.dataset.intro,
  introPresent: !!document.querySelector(".intro"),
  scrollY: window.scrollY,
  heroClip: getComputedStyle(document.querySelector(".hero__arch")).clipPath,
}));
console.log(state);

await browser.close();