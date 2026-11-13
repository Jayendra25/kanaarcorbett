import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3000/?nointro=1";
const out = process.argv[3] ?? ".shots/page.png";
const width = Number(process.argv[4] ?? 1440);
const height = Number(process.argv[5] ?? 1000);
const wait = Number(process.argv[6] ?? 3500);
const scroll = Number(process.argv[7] ?? 0);
const full = process.argv[8] === "full";
const selector = process.argv[8]?.startsWith("#") || process.argv[8]?.startsWith(".")
  ? process.argv[8]
  : null;

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
page.on("console", (message) => {
  if (message.type() === "error") console.log("CONSOLE ERROR:", message.text());
});
page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));

await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((resolve) => setTimeout(resolve, wait));

if (scroll) {
  await page.evaluate((y) => window.scrollTo(0, y), scroll);
  await new Promise((resolve) => setTimeout(resolve, 1600));
}

const metrics = await page.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  intro: document.documentElement.dataset.intro,
  sections: Array.from(document.querySelectorAll("section")).map((section) => ({
    id: section.id,
    top: Math.round(section.getBoundingClientRect().top + window.scrollY),
    height: Math.round(section.getBoundingClientRect().height),
  })),
}));
console.log(JSON.stringify(metrics, null, 2));

if (selector) {
  const element = await page.$(selector);
  if (element) await element.screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: full });
}

await browser.close();
console.log("saved", out);