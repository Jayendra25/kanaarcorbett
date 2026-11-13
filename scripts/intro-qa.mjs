import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

// 1. Intro plays once per session
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/?intro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 500));
console.log(
  "intro at start:",
  await page.evaluate(() => ({
    data: document.documentElement.dataset.intro,
    present: !!document.querySelector(".intro"),
    locked: document.body.classList.contains("intro-lock"),
  })),
);
await new Promise((r) => setTimeout(r, 4300));
console.log(
  "intro after 4.8s:",
  await page.evaluate(() => ({
    data: document.documentElement.dataset.intro,
    present: !!document.querySelector(".intro"),
    stored: sessionStorage.getItem("kanaar-intro"),
    locked: document.body.classList.contains("intro-lock"),
    arch: getComputedStyle(document.querySelector(".hero__arch")).clipPath,
    title: getComputedStyle(document.querySelector(".hero__title .line-mask > span")).opacity,
  })),
);

await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2500));
console.log(
  "plain reload after seen:",
  await page.evaluate(() => ({
    data: document.documentElement.dataset.intro,
    present: !!document.querySelector(".intro"),
    arch: getComputedStyle(document.querySelector(".hero__arch")).clipPath,
    locked: document.body.classList.contains("intro-lock"),
  })),
);

// 3. Replay from footer
await page.evaluate(() => document.querySelector(".footer__replay")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 400));
await page.click(".footer__replay");
await new Promise((r) => setTimeout(r, 1200));
console.log(
  "after replay:",
  await page.evaluate(() => ({
    data: document.documentElement.dataset.intro,
    present: !!document.querySelector(".intro"),
    stored: sessionStorage.getItem("kanaar-intro"),
  })),
);
await page.close();

// 2. Reduced motion (fresh context, no session)
const reduced = await browser.newPage();
await reduced.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await reduced.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await reduced.goto("http://localhost:3000/?intro=1", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 900));
console.log(
  "reduced motion:",
  await reduced.evaluate(() => ({
    data: document.documentElement.dataset.intro,
    present: !!document.querySelector(".intro"),
    arch: getComputedStyle(document.querySelector(".hero__arch")).clipPath,
    heroTitle: getComputedStyle(document.querySelector(".hero__title .line-mask > span")).opacity,
    revealOpacity: getComputedStyle(document.querySelector("[data-reveal]")).opacity,
    locked: document.body.classList.contains("intro-lock"),
  })),
);
await reduced.screenshot({ path: ".shots/qa-reduced.png" });
await reduced.close();

// 4. No JS: noscript path
await browser.close();
console.log("intro qa done");