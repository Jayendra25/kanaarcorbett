import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

async function open(width, height, mobile = false) {
  const page = await browser.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.log("console", width, m.text()); });
  page.on("pageerror", (e) => console.log("pageerror", width, e.message));
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 2500));
  return page;
}

async function scrollToStory(page, offset) {
  await page.evaluate((offset) => {
    const el = document.querySelector(".story");
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset);
  }, offset);
  await new Promise((r) => setTimeout(r, 1500));
}

async function state(page, label) {
  const data = await page.evaluate(() => ({
    plates: Array.from(document.querySelectorAll(".story .plate, .story__mobile .plate")).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        scene: el.getAttribute("data-scene"),
        photo: el.classList.contains("plate--photo"),
        src: el.querySelector("img")?.getAttribute("src")?.split("url=")[1]?.split("&")[0],
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        opacity: getComputedStyle(el.closest(".story__scene") || el).opacity,
      };
    }),
    broken: Array.from(document.images).filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.currentSrc),
  }));
  console.log(label, JSON.stringify(data, null, 2));
}

const desktop = await open(1440, 1000);
await scrollToStory(desktop, 0);
await desktop.screenshot({ path: ".shots/story-d1.png" });
await state(desktop, "desktop scene 1");
await scrollToStory(desktop, 950);
await desktop.screenshot({ path: ".shots/story-d2.png" });
await state(desktop, "desktop scene 2");
await scrollToStory(desktop, 1850);
await desktop.screenshot({ path: ".shots/story-d3.png" });
await state(desktop, "desktop scene 3");

const tablet = await open(768, 1024, true);
await scrollToStory(tablet, 0);
await new Promise((r) => setTimeout(r, 800));
await scrollToStory(tablet, 500);
await tablet.screenshot({ path: ".shots/story-t1.png" });
await state(tablet, "tablet");

const mobile = await open(390, 844, true);
for (const [i, sel] of [".story__mobile-item:nth-child(1)", ".story__mobile-item:nth-child(2)", ".story__mobile-item:nth-child(3)"].entries()) {
  await mobile.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100);
  }, sel);
  await new Promise((r) => setTimeout(r, 1400));
  await mobile.screenshot({ path: `.shots/story-m${i + 1}.png` });
}
await state(mobile, "mobile");

await browser.close();
