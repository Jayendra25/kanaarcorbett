import puppeteer from "puppeteer-core";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const root = path.resolve("brochure");
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1", "--font-render-hinting=none"],
});

const page = await browser.newPage();
page.on("console", (m) => { if (m.type() === "error") console.log("console:", m.text()); });
page.on("pageerror", (e) => console.log("pageerror:", e.message));
await page.emulateMediaType("print");
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
await page.goto(`file://${root}/index.html`, { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(
    Array.from(document.images).map((img) =>
      img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r; }),
    ),
  );
});
await new Promise((r) => setTimeout(r, 700));

const pages = await page.$$(".page");
console.log("pages:", pages.length);

await mkdir(".shots", { recursive: true });

for (let i = 0; i < pages.length; i += 1) {
  await pages[i].screenshot({
    path: `.shots/page-${String(i + 1).padStart(2, "0")}.png`,
  });
}

await page.pdf({
  path: `${root}/Hotel-Kanaar-Corbett-Brochure.pdf`,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

const info = await page.evaluate(() => ({
  pages: document.querySelectorAll(".page").length,
  overflow: Array.from(document.querySelectorAll(".page")).map((p, i) => ({
    page: i + 1,
    scrollH: p.scrollHeight,
    clientH: p.clientHeight,
    scrollW: p.scrollWidth,
    clientW: p.clientWidth,
  })),
}));
console.log(JSON.stringify(info, null, 2));

await browser.close();
