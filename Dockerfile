FROM node:12.4.0
ENV HOST 0.0.0.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN API_URL=https://ginger.travelers-hub.com NODE_ENV=production npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]