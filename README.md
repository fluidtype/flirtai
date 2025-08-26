# FlirtAI

Prototipo full-stack Next.js 14 per un coach relazionale.

## Avvio

```bash
cp .env.local.example .env.local
nano .env.local # Inserisci la tua OPENAI_API_KEY
npm install
npm run dev
```

## Configurazione ambiente

- In sviluppo l'app legge **solo** `.env.local` (override) e, in mancanza, `.env`.
- Se esiste `.env.local.example` ma manca `.env.local`, in console apparirà un suggerimento a crearlo.
- All'avvio del server viene stampata una diagnostica simile a:

```
Rilevati file .env*: .env.local.example
Caricato .env.local -> OPENAI_API_KEY: OK, MODEL: default gpt-4o-mini, BASE: default. Ricorda di riavviare dopo modifiche.
```

Variabili supportate:

- `OPENAI_API_KEY` (obbligatoria)
- `OPENAI_API_BASE` (default `https://api.openai.com/v1`)
- `OPENAI_MODEL` (default `gpt-4o-mini`)

Ricorda di riavviare il server dopo ogni modifica ai file `.env*`.

### Test dell'API

```bash
curl -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"Ciao"}]}'
```

Risposte tipiche:

- `200 { "ok": true, "content": "..." }` → richiesta riuscita
- `400 { "ok": false, "source": "config", "message": "OPENAI_API_KEY mancante (definiscila in .env.local e riavvia)" }`
- `400 { "ok": false, "source": "client", "message": "messages mancante" }`
- `502 { "ok": false, "source": "openai", "status": 401, "message": "Chiave errata o non attiva" }`
- `504 { "ok": false, "source": "network", "message": "Problema di rete o timeout" }`

La route `GET /api/chat` risponde `405`.

## Test

```bash
npm test
```
