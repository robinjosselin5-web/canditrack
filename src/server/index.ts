import { app } from './app.js'
import { env } from './config/env.js'

const server = app.listen(env.PORT, () => {
  console.info(`CandiTrack API listening on http://localhost:${env.PORT}`)
})

function shutdown(): void {
  server.close(() => {
    console.info('CandiTrack API stopped')
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
