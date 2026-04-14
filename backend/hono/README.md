# Quiz Maker API - Cloudflare Workers Deployment

## Prerequisites

- Node.js 18+
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account

## Setup

### 1. Install Dependencies

```bash
cd backend/hono
npm install
```

### 2. Create Remote D1 Database

```bash
npm run d1:remote:create
```

**Note:** If the database already exists, skip this step and ensure `database_id` in `wrangler.toml` is correct.

### 3. Apply Schema

```bash
npm run d1:remote:schema
```

### 4. Seed Database (Optional)

```bash
npm run d1:remote:seed
```

This populates the database with sample quizzes and questions.

### 5. Deploy

```bash
npm run deploy
```

Your API will be live at: `https://quiz-maker-api.<your-subdomain>.workers.dev`

### 6. Configure API Token

**Important:** Deploy first, then set the secret. Setting the secret before deploy will cause a conflict warning.

Set your API token as an environment variable, then run:

```bash
API_TOKEN="your-secret-token" npm run configure:api-token
```

## Local Development

### Create Local D1

```bash
npm run d1:local:create
```

### Apply Schema to Local

```bash
npm run d1:local:schema
```

### Seed Local Database

```bash
npm run d1:local:seed
```

### Start Dev Server

```bash
npm run dev
```

The local API will be available at `http://localhost:8787`

## D1 Database Commands

| Command | Description |
|---------|-------------|
| `npm run d1:local:create` | Create local D1 database |
| `npm run d1:local:delete` | Delete local D1 database |
| `npm run d1:local:schema` | Apply schema to local D1 |
| `npm run d1:local:seed` | Seed local D1 with sample data |
| `npm run d1:remote:create` | Create remote D1 database |
| `npm run d1:remote:delete` | Delete remote D1 database |
| `npm run d1:remote:schema` | Apply schema to remote D1 |
| `npm run d1:remote:seed` | Seed remote D1 with sample data |

## Troubleshooting

### Database ID not found

If `d1:remote:*` commands fail, verify `database_id` in `wrangler.toml` matches your Cloudflare D1 database ID.

### Secret already in use

If `configure:api-token` fails with "already in use", delete the existing secret first:

```bash
npx wrangler secret delete API_TOKEN
API_TOKEN="your-token" npm run configure:api-token
```

### Redeploy after schema changes

```bash
npm run d1:remote:schema
npm run deploy
```
