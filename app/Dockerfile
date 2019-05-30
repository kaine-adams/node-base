# Base Container
FROM node:carbon

# Install global packages
RUN npm install -g knex

# Application Root
WORKDIR /usr/src/app

# Node Enviroment
ENV NODE_ENV=production
ENV NODE_PATH=/usr/src/app/lib
ENV NODE_PORT=3000

# Application Dependancies
COPY package*.json ./
RUN npm install

# Application Enviroment
ENV SESSION_SECRET=keyboard_cat

# Copy Application Source
COPY . .

RUN  npm run-script webpack

# Configure Application Statup
EXPOSE ${NODE_PORT}
CMD ["npm", "start"]