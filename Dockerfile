FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install pnpm -g

RUN pnpm install

COPY . .

RUN pnpm build

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["pnpm", "dev"]