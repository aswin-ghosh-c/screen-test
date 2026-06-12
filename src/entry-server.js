import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url) {
  const { app } = createApp()
  
  // You can set up routing/state logic here if you introduce a router later.
  // For now, since the app is state-based, the initial page loads cleanly.
  
  const ctx = {}
  const html = await renderToString(app, ctx)

  return { html }
}
