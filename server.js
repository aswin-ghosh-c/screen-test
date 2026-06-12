import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

// Inject Vue SSR environment flags globally for Node.js
globalThis.__VUE_PROD_DEVTOOLS__ = false
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
globalThis.__VUE_I18N_FULL_INSTALL__ = true
globalThis.__VUE_I18N_LEGACY_API__ = false
globalThis.__VUE_I18N_PROD_DEVTOOLS__ = false
globalThis.__INTLIFY_PROD_DEVTOOLS__ = false

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const root = process.cwd()

async function createServer() {
  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100
        }
      },
      appType: 'custom'
    })
    // Use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // Always read fresh template in dev
        template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      const { html: appHtml } = await render(url)

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e)
      }
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app }
}

createServer().then(({ app }) =>
  app.listen(5173, () => {
    console.log('Server running at http://localhost:5173')
  })
)
