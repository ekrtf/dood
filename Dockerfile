FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
RUN mkdir -p /usr/src/app/frontend/main
RUN mkdir -p /usr/src/app/frontend/admin
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app

# Install shared dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install frontend dependencies
COPY frontend/package.json /usr/src/app/frontend
RUN cd frontend && npm install

# Install server dependencies
COPY server/package.json /usr/src/app/server
RUN cd server && npm install

# Bundle app source
COPY . /usr/src/app

# Set ENV to production
ENV ENV 'prod'

# Build frontends
RUN cd frontend/main && npm run build
RUN cd frontend/admin && npm run build

EXPOSE 4000

CMD [ "npm", "start" ]
