import { serve } from "bun"
import { afterEach } from "bun:test"

export const getTestFootprintServer = (json: any) => {
  const server = serve({
    port: 0,
    fetch: () =>
      new Response(JSON.stringify(json), {
        headers: { "Content-Type": "application/json" },
      }),
  })

  afterEach(() => {
    server.stop()
  })

  return {
    url: `http://localhost:${server.port}/footprint.json`,
    close: () => server.stop(),
  }
}
