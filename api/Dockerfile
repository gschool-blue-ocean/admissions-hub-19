FROM node:16-alpine
WORKDIR /code
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
