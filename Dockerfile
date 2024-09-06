FROM node:20-alpine AS base

COPY \
	.node-version \
	.nvmrc \
	astro.config.mjs \
	license.txt \
	package-lock.json \
	package.json \
	tailwind.config.mjs \
	tsconfig.json \
	/app/

COPY public /app/public
COPY src /app/src

WORKDIR /app

FROM base AS deps
# Mount the prisma directory so we can generate the client.
RUN --mount=type=bind,source=prisma,target=/app/prisma \
    npm ci --ignore-scripts

FROM base AS pocket-photo-log-dev
COPY --from=deps /app/node_modules /app/node_modules
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

FROM base AS pocket-photo-log-prod
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
# Copy the prisma sources so we can ship them with the image.
COPY prisma ./prisma
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx prisma/seed.ts && node ./dist/server/entry.mjs"]
