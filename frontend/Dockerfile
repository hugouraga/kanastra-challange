FROM oven/bun:latest AS base

WORKDIR /app
 
ADD ./frontend .

RUN bun install

EXPOSE 8888

CMD ["bun", "run", "dev"]