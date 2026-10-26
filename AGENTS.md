# AGENTS.md

## Layout

- Git root contains exactly one project: `wanderlust-client/` — a Next.js 16.4.3 (App Router, React 19, TS, Tailwind v4, Turbopack) landing-page app. The root has **no** `package.json`; run every npm command from `wanderlust-client/`.
- npm is the package manager (committed `package-lock.json`); ignore the yarn/pnpm/bun suggestions in `wanderlust-client/README.md` (stock boilerplate). Shell is PowerShell on Windows.

## Commands (cwd: `wanderlust-client/`)

- `npm run dev` — dev server (Turbopack) on localhost:3000
- `npm run lint` — ESLint flat config (`eslint.config.mjs`); warnings don't fail (exit 0)
- `npx tsc --noEmit` — typecheck; there is **no** `typecheck` script
- `npm run build` — production build, also typechecks

No tests, no CI, no pre-commit hooks. Verification order: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

**Fresh-clone gotcha:** `next-env.d.ts` and `.next/types/` are gitignored, but `layout.tsx` uses `LayoutProps<"/">` generated into `.next/types/routes.d.ts`. Run `npm run dev` or `npm run build` once before typechecking, or typecheck fails on missing generated types.

## Next.js 16 — not the Next.js you know

- `wanderlust-client/AGENTS.md` holds a managed block (markers `<!-- BEGIN:nextjs-agent-rules -->`) that `next dev` rewrites/restores (source: `wanderlust-client/node_modules/next/dist/server/lib/generate-agent-files.js`). Never delete the block; commit it with your work.
- Read the bundled guides in `wanderlust-client/node_modules/next/dist/docs/` before writing Next.js code; heed deprecation notices.

## Toolchain quirks

- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true` (babel-plugin-react-compiler is wired up — don't hand-memoize), plus a Turbopack rule mapping `*.css` → `@tailwindcss/turbopack`.
- Tailwind v4: there is **no** `tailwind.config.*`. Theme tokens/CSS variables live in `src/app/globals.css` (`@theme inline` + `:root`/`.dark` vars); dark mode is the `.dark` class.
- shadcn style is `base-nova`: UI primitives in `src/components/ui/` are built on **Base UI** (`@base-ui/react`), not Radix. Add new ones with `npx shadcn add <component>` (config: `components.json`). `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts` (`@/lib/utils`).
- Path alias: `@/*` → `./src/*` (tsconfig).

## Structure

- App Router entry: `wanderlust-client/src/app/` — `layout.tsx` (fonts, `metadata` export), `page.tsx` (single landing page), `globals.css`.
- UI primitives: `src/components/ui/`. Static images: `public/images/`, used via `next/image`.
