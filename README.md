# P. Kabijake — Developer Portfolio

A cinematic React + Vite portfolio with Tailwind CSS, Framer Motion, Lucide icons, and live public GitHub data.

## Run locally

Requires Node.js 22.14 or later.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

## Customize

- `src/config/profile.js`: identity, education, social links, portrait path, and public email. Set `email` to enable the contact email link.
- `src/data/projects.js`: featured project descriptions, technologies, conceptual artwork, and repository matching.
- `src/data/skills.js`: technology categories.
- `src/index.css`: responsive cinematic styles.
- `index.html`: page metadata. Before public deployment, set an absolute `og:image` URL for your hosting domain.

## GitHub integration

Uses unauthenticated public GitHub REST endpoints, fetches every repository page, excludes forks and the profile README, and sorts by featured status, recency, description availability, then stars. Requests are deduplicated and cached for 15 minutes. A previous successful response remains available during outages; otherwise users get a retry action and direct profile link. Repository homepages appear as live demos only when GitHub supplies a valid HTTP(S) URL. Profile statistics come directly from the user endpoint.

InternTrack, TripWise, and BoardLK public repository URLs were verified during implementation. Farm2Home LK is included using supplied project information, without an invented repository URL. Project images are locally generated conceptual illustrations, not screenshots of deployed products.

## Accessibility and responsive behavior

Native modal dialogs provide focus containment, Escape dismissal, background isolation, and restored focus. Keyboard focus is visible, rows support native touch scrolling, the mobile menu exposes its expanded state, and motion respects reduced-motion preferences. Layouts were checked at 1440, 1024, 768, 430, and 375 pixels.

## Assets

The supplied portrait is optimized as local WebP. To regenerate it from another original photo:

```sh
node generate-assets.mjs "path/to/photo.jpeg"
```

Running the script without an argument regenerates only the project SVG illustrations. The site does not require the original photo or access to its drive.

Design concept reference: https://github.com/Sushmitadasari/Netflix_portfolio. This application is independently implemented with Kabijake's supplied content.
