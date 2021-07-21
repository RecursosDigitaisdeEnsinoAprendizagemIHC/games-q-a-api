FROM node:14

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/games-qa-api

# Installing dependencies
COPY games-qa-api/package*.json ./
COPY games-qa-api/yarn.lock ./
RUN yarn install

# Copying source files
# COPY /usr/src/app/games-qa-api .

# Building app
# RUN npm run build
EXPOSE 3000

# Running the app
CMD ["yarn", "dev"]
