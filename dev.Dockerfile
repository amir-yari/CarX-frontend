# Development/Test build
FROM node:20-alpine

LABEL maintainer="Hassan Attar <h.a.develops@gmail.com>"

WORKDIR /home/node/app

COPY package*.json ./

# Define build argument for NODE_ENV
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install
# Copy the rest of the application code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# USER node # Vite needs root privilege to start the dev mode