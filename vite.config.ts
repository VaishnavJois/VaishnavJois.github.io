import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

// Hashed font names change every build, so inject <link rel=preload> for the hero fonts here.
const preloadHeroFonts = (): Plugin => ({
  name: 'preload-hero-fonts',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(_html, ctx) {
      return Object.keys(ctx.bundle ?? {})
        .filter((f) => /(inter-latin-wght-normal|instrument-serif-latin-400-italic)-.+\.woff2$/.test(f))
        .sort()
        .map((f) => ({
          tag: 'link',
          injectTo: 'head' as const,
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `./${f}` },
        }))
    },
  },
})

// Dev server only: the badges and devcard.png live in the repo's assets/ folder (outside the Vite
// root), so serve them at /assets/ exactly as GitHub Pages does in production.
const MIME: Record<string, string> = { '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' }
const serveRepoAssets = (): Plugin => ({
  name: 'serve-repo-assets',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/assets', (req, res, next) => {
      const rel = decodeURIComponent((req.url ?? '/').split('?')[0])
      const file = fileURLToPath(new URL(`./assets${rel}`, import.meta.url))
      if (rel.includes('..') || !existsSync(file) || !statSync(file).isFile()) return next()
      res.setHeader('Content-Type', MIME[extname(file)] ?? 'application/octet-stream')
      createReadStream(file).pipe(res)
    })
  },
})

// Source lives in _src/ (Jekyll ignores underscore dirs, so it is never published).
// The production build is written to the repository root so GitHub Pages can serve
// `live` as plain static files. Hashed JS/CSS/fonts go to assets/build/; everything
// else in assets/ (badges, devcard.png) is left alone.
export default defineConfig({
  root: '_src',
  base: './',
  publicDir: false,
  plugins: [react(), preloadHeroFonts(), serveRepoAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./_src/src', import.meta.url)),
    },
  },
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'assets/build',
    target: 'es2020',
    cssCodeSplit: false,
    reportCompressedSize: true,
  },
})
