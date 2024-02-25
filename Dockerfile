FROM node:21
WORKDIR /content
RUN git clone https://github.com/journey-ad/chat-room.git
WORKDIR /content/chat-room
RUN yarn
CMD ["yarn", "start"]