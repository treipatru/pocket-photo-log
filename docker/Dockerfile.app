FROM node:20-alpine AS base
COPY . /app
WORKDIR /app

FROM base AS deps
RUN npm ci

FROM base AS pocket-photo-log-dev
COPY --from=deps /app/node_modules /app/node_modules
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

FROM base AS pocket-photo-log-prod
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
CMD ["node", "./dist/server/entry.mjs"]
