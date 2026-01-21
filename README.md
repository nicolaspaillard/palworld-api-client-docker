# Palworld API Client Docker

A modern Angular-based web client for managing Palworld game servers with Docker containerization.

## Features

- Server Management Dashboard
- Player Management
- Responsive UI with Angular 21 & PrimeNG
- Docker Support with Docker Compose
- Built-in API Authentication

## Quick Start

### Local Development

```bash
npm install
npm start
```

Visit `http://localhost:4200`

### Docker

Pull and run from Docker Hub:

```bash
docker pull nicolaspaillard/palworld-api-client-docker
docker run -d -p 8080:8080 \
  --env API_HOST=palworld \
  --env API_PORT=8212 \
  --env API_PASSWORD=your_password \
  nicolaspaillard/palworld-api-client-docker
```

Or use Docker Compose with `compose.yaml`:

```bash
docker compose up -d
```

Configure environment variables in `compose.yaml`:

```yaml
services:
  client:
    image: nicolaspaillard/palworld-api-client-docker:latest
    environment:
      PORT: 8080
      API_HOST: palworld
      API_PORT: 8212
      API_PASSWORD: palworld
    ports:
      - 8080:8080
```

## Environment Variables

- `API_HOST` - API server hostname (default: `palworld`)
- `API_PORT` - API server port (default: `8212`)
- `API_PASSWORD` - API authentication password (default: `palworld`)
- `PORT` - Client port (default: `8080`)

## Project Structure

```
src/
├── app/
│   ├── routes/
│   │   ├── home/       # Server dashboard
│   │   └── players/    # Players list
│   └── shared/
│       ├── classes/    # Data models
│       └── services/   # API services
├── main.ts
└── styles.css
```

## Tech Stack

- **Frontend**: Angular 21, TypeScript
- **UI**: PrimeNG, Tailwind CSS
- **Container**: Docker, Nginx (unprivileged)
