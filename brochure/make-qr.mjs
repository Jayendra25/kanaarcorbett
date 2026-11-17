import QRCode from "qrcode";
import { writeFile } from "node:fs/promises";

const targets = [
  ["brochure/assets/qr-map.svg", "https://www.google.com/maps/dir/?api=1&destination=29.3377768,79.0581322"],
  ["brochure/assets/qr-website.svg", "https://kanaarcorbett.com"],
];

for (const [file, url] of targets) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#23211D", light: "#00000000" },
  });
  await writeFile(file, svg);
  console.log("wrote", file);
}
