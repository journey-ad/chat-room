FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start" ]
