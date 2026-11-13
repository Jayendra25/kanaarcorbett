import puppeteer from "puppeteer-core";

const base = "http://localhost:3000/?nointro=1";
const width = Number(process.argv[2] ?? 390);
const height = Number(process.argv[3] ?? 844);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE ERROR:", m.text());
});
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));

await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
await page.goto(base, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));

const metrics = await page.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  innerWidth: window.innerWidth,
  sections: Array.from(document.querySelectorAll("section")).map((s) => ({
    id: s.id,
    top: Math.round(s.getBoundingClientRect().top + window.scrollY),
    height: Math.round(s.getBoundingClientRect().height),
  })),
}));
console.log(JSON.stringify(metrics, null, 2));

// hero
await page.screenshot({ path: `.shots/m-hero-${width}.png` });

const ids = ["hotel", "stays", "dining", "celebrations", "corbett", "gallery", "contact"];
for (const id of ids) {
  const el = await page.$(`#${id}`);
  if (!el) continue;
  const box = await el.boundingBox();
  if (!box) continue;
  const y = await page.evaluate((el) => el.getBoundingClientRect().top + window.scrollY, el);
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, y - 20));
  await new Promise((r) => setTimeout(r, 1400));
  await page.screenshot({ path: `.shots/m-${id}-${width}.png` });
}

// full page
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `.shots/m-full-${width}.png`, fullPage: true });

await browser.close();
console.log("done");