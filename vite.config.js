import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE_PATH = path.resolve(__dirname, 'public', 'data.json')

const readDataFile = async () => {
  const contents = await readFile(DATA_FILE_PATH, 'utf8')
  const parsed = JSON.parse(contents)

  if (Array.isArray(parsed)) {
    return { users: parsed }
  }

  if (parsed && typeof parsed === 'object') {
    if (!Array.isArray(parsed.users)) {
      parsed.users = []
    }
    return parsed
  }

  return { users: [] }
}

const writeUsers = async (data, users) => {
  const nextData =
    data && typeof data === 'object' && !Array.isArray(data)
      ? { ...data, users }
      : { users }

  await writeFile(
    DATA_FILE_PATH,
    `${JSON.stringify(nextData, null, 2)}\n`,
    'utf8'
  )
}

const usersApiPlugin = () => ({
  name: 'users-api-middleware',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/users', (req, res) => {
      const originalUrl = req.originalUrl ?? req.url ?? ''
      const [pathname] = originalUrl.split('?')
      const suffix = pathname.slice('/api/users'.length)

      const sendJson = (statusCode, body) => {
        res.statusCode = statusCode
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(JSON.stringify(body))
      }

      const sendNoContent = () => {
        res.statusCode = 204
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.end()
      }

      const run = async () => {
        if (suffix && suffix !== '/') {
          if (req.method === 'OPTIONS') {
            sendNoContent()
            return
          }

          sendJson(404, { message: 'Not found' })
          return
        }

        if (req.method === 'OPTIONS') {
          sendNoContent()
          return
        }

        if (req.method === 'GET') {
          const data = await readDataFile()
          sendJson(200, data.users)
          return
        }

        if (req.method === 'POST') {
          const body = await new Promise((resolve, reject) => {
            let raw = ''
            req.setEncoding('utf8')
            req.on('data', (chunk) => {
              raw += chunk
            })
            req.on('end', () => resolve(raw))
            req.on('error', reject)
          })

          let payload
          try {
            payload = JSON.parse(body || '{}')
          } catch {
            sendJson(400, { message: 'Invalid JSON body' })
            return
          }

          const email = payload.email?.trim()
          const password = payload.password?.trim()

          if (!email || !password) {
            sendJson(400, { message: 'Email and password required' })
            return
          }

          const data = await readDataFile()
          const nextUsers = [...data.users, { email, password }]

          await writeUsers(data, nextUsers)

          sendJson(201, { email })
          return
        }

        res.setHeader('Allow', 'GET, POST, OPTIONS')
        sendJson(405, { message: 'Method not allowed' })
      }

      run().catch((error) => {
        console.error('[users-api] error:', error)
        sendJson(500, { message: 'Internal server error' })
      })
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    usersApiPlugin(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
