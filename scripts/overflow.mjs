import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));

for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1400));
  const report = await page.evaluate(() => {
    const w = window.innerWidth;
    const offenders = [];
    document.querySelectorAll("body *").forEach((el) => {
      const style = getComputedStyle(el);
      if (style.position === "fixed") return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      if (rect.right > w + 1 || rect.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 60),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    });
    return {
      innerWidth: w,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      offenders: offenders.slice(0, 12),
    };
  });
  console.log(width, JSON.stringify(report));
}
await browser.close();