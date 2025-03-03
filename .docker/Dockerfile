FROM --platform=amd64 node:23.5.0-slim

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD npm run dev