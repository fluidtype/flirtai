import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

const root = process.cwd()
const envFiles = fs.readdirSync(root).filter((f) => f.startsWith('.env'))

const dev = process.env.NODE_ENV !== 'production'
let loadedFile = null
if (dev) {
  const localPath = path.join(root, '.env.local')
  const defaultPath = path.join(root, '.env')
  if (fs.existsSync(localPath)) {
    dotenv.config({ path: localPath })
    loadedFile = '.env.local'
  } else if (fs.existsSync(defaultPath)) {
    dotenv.config({ path: defaultPath })
    loadedFile = '.env'
  }
  if (!fs.existsSync(localPath) && fs.existsSync(path.join(root, '.env.local.example'))) {
    console.log('Suggerimento: crea .env.local basato su .env.local.example')
  }
}

const aliasMap = {
  OPENAI_KEY: 'OPENAI_API_KEY',
  OPENAI_SECRET: 'OPENAI_API_KEY',
  OPENAI_ENDPOINT: 'OPENAI_API_BASE',
  OPENAI_CHAT_MODEL: 'OPENAI_MODEL',
}
for (const [legacy, standard] of Object.entries(aliasMap)) {
  if (process.env[legacy] && !process.env[standard]) {
    process.env[standard] = process.env[legacy]
    console.warn(`Rilevata variabile legacy ${legacy} -> usa ${standard}`)
  }
}

if (!process.env.OPENAI_API_BASE) {
  process.env.OPENAI_API_BASE = 'https://api.openai.com/v1'
}
if (!process.env.OPENAI_MODEL) {
  process.env.OPENAI_MODEL = 'gpt-4o-mini'
}

const filesList = envFiles.length ? envFiles.join(', ') : 'nessuno'
const keyStatus = process.env.OPENAI_API_KEY ? 'OK' : 'MANCANTE'
const modelStatus = process.env.OPENAI_MODEL && process.env.OPENAI_MODEL !== 'gpt-4o-mini'
  ? 'OK'
  : `default ${process.env.OPENAI_MODEL}`
const baseStatus = process.env.OPENAI_API_BASE && process.env.OPENAI_API_BASE !== 'https://api.openai.com/v1'
  ? 'OK'
  : 'default'
const loaded = loadedFile ? `Caricato ${loadedFile}` : 'Usando solo env di sistema'
console.log(`Rilevati file .env*: ${filesList}`)
console.log(`${loaded} -> OPENAI_API_KEY: ${keyStatus}, MODEL: ${modelStatus}, BASE: ${baseStatus}. Ricorda di riavviare dopo modifiche.`)
