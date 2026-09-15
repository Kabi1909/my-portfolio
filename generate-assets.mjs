import sharp from "sharp";
import { writeFile } from "node:fs/promises";
if (process.argv[2])
  await sharp(process.argv[2])
    .rotate()
    .resize({ width: 1500, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile("public/assets/portrait.webp");
const designs = {
  interntrack: {
    bg: "#1a132b",
    glow: "#8860c9",
    shapes:
      '<g transform="translate(240 45) rotate(-12 160 100)"><rect width="240" height="160" rx="12" fill="#403359" stroke="#a785d6" stroke-opacity=".4"/><rect x="18" y="20" width="85" height="8" rx="4" fill="#cab4ed"/><rect x="18" y="40" width="150" height="5" rx="2" fill="#786490"/><rect x="18" y="65" width="60" height="62" rx="5" fill="#655182"/><rect x="90" y="65" width="60" height="62" rx="5" fill="#655182"/><rect x="162" y="65" width="60" height="62" rx="5" fill="#655182"/><path d="m31 91 9 9 23-24" fill="none" stroke="#c4f3cb" stroke-width="5"/></g><circle cx="215" cy="117" r="29" fill="#9769c1"/><path d="m204 117 8 8 16-19" stroke="#fff" stroke-width="4" fill="none"/>',
  },
  tripwise: {
    bg: "#0e292b",
    glow: "#368e8b",
    shapes:
      '<circle cx="430" cy="65" r="38" fill="#e0dcb4" opacity=".7"/><path d="M0 235 135 81 224 183 337 43 560 252Z" fill="#285054"/><path d="m244 165 93-122 62 91-64-34-33 49-21-10Z" fill="#96bfbc"/><path d="M0 261 174 178 265 222 426 143 560 231V340H0Z" fill="#164043"/><path d="M360 200q-140 27-40 54t-170 75" fill="none" stroke="#8cc7bc" stroke-width="6" opacity=".6"/>',
  },
  farm2home: {
    bg: "#1c2b16",
    glow: "#94a444",
    shapes:
      '<circle cx="420" cy="75" r="43" fill="#e4d99a" opacity=".6"/><path d="M0 223Q145 82 310 185T600 130V350H0Z" fill="#617643"/><path d="M0 232Q180 172 330 244T600 186V350H0Z" fill="#3a582e"/><path d="M0 271Q175 210 370 270T600 250V350H0Z" fill="#243f24"/><g stroke="#abc176" stroke-width="3" opacity=".5"><path d="M260 245 150 340M310 252 245 340M360 263 340 340M410 269 435 340M460 270 525 340"/></g><path d="M322 198v-55q-50-35-54-9t54 22q5-61 43-54t-43 44" stroke="#c0d57a" fill="#759e48" stroke-width="3"/>',
  },
  boardlk: {
    bg: "#302018",
    glow: "#bb7c4c",
    shapes:
      '<g stroke="#d8af87" stroke-opacity=".4"><path d="m245 234 0-115 84-53 84 53v115Z" fill="#966747"/><path d="m329 66 84 53 77-37-81-46Z" fill="#c08c63"/><path d="m413 119 77-37v143l-77 9Z" fill="#66472f"/><rect x="272" y="135" width="28" height="40" fill="#e5c79c"/><rect x="341" y="135" width="28" height="40" fill="#e5c79c"/><rect x="310" y="187" width="32" height="47" fill="#46332a"/></g><path d="M226 81a22 22 0 1 0-44 0c0 17 22 37 22 37s22-20 22-37" fill="#d88e67"/><circle cx="204" cy="80" r="7" fill="#33221a"/>',
  },
};
for (const [name, d] of Object.entries(designs)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 340"><defs><radialGradient id="g"><stop stop-color="${d.glow}" stop-opacity=".6"/><stop offset="1" stop-color="${d.bg}"/></radialGradient><pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#ffffff" stroke-opacity=".04"/></pattern></defs><rect width="560" height="340" fill="${d.bg}"/><rect width="560" height="340" fill="url(#g)"/><rect width="560" height="340" fill="url(#p)"/>${d.shapes}</svg>`;
  await writeFile(`public/assets/${name}.svg`, svg);
}
