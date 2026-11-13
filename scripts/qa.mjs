import puppeteer from "puppeteer-core";

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

await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/?nointro=1", { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3200));

// Menu (mobile viewport)
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 3000));
await page.click(".menu-toggle");
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: ".shots/qa-menu.png" });
console.log(
  "menu:",
  await page.evaluate(() => ({
    dialog: !!document.querySelector(".menu"),
    expanded: document.querySelector(".menu-toggle")?.getAttribute("aria-expanded"),
    bodyOverflow: getComputedStyle(document.body).overflow,
    focused: document.activeElement?.getAttribute("aria-label"),
  })),
);
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 1200));
console.log(
  "menu closed:",
  await page.evaluate(() => ({
    dialog: !!document.querySelector(".menu"),
    bodyOverflow: getComputedStyle(document.body).overflow,
  })),
);

// Lightbox
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.reload({ waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 3200));
const gallery = await page.$("#gallery");
const gy = await page.evaluate((el) => el.getBoundingClientRect().top + window.scrollY, gallery);
await page.evaluate((y) => window.scrollTo(0, y), gy - 40);
await new Promise((r) => setTimeout(r, 1200));
await page.click(".gallery__item");
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: ".shots/qa-lightbox.png" });
const before = await page.evaluate(() => document.querySelector(".lightbox__label")?.textContent);
await page.keyboard.press("ArrowRight");
await new Promise((r) => setTimeout(r, 800));
const after = await page.evaluate(() => document.querySelector(".lightbox__label")?.textContent);
console.log("lightbox next:", before, "->", after);
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 800));
console.log("lightbox closed:", await page.evaluate(() => !document.querySelector(".lightbox")));

// Contact form validation
const contact = await page.$("#contact");
const cy = await page.evaluate((el) => el.getBoundingClientRect().top + window.scrollY, contact);
await page.evaluate((y) => window.scrollTo(0, y), cy);
await new Promise((r) => setTimeout(r, 1400));
await page.click('.form-card button[type="submit"]');
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: ".shots/qa-form-errors.png" });
console.log(
  "errors:",
  await page.evaluate(() =>
    Array.from(document.querySelectorAll(".field__error")).map((n) => n.textContent),
  ),
);

await page.type("#name", "Aarav Sharma");
await page.type("#phone", "+91 98765 43210");
await page.select("#interest", "A wedding or celebration");
await page.type("#message", "A small family wedding for 60 guests in December.");
await new Promise((r) => setTimeout(r, 400));
await page.click('.form-card button[type="submit"]');
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: ".shots/qa-form-success.png" });
console.log(
  "success:",
  await page.evaluate(() => ({
    visible: !!document.querySelector(".form-success"),
    heading: document.querySelector(".form-success h3")?.textContent,
    whatsapp: document.querySelector(".form-success a")?.getAttribute("href")?.slice(0, 60),
  })),
);

await browser.close();
console.log("qa done");