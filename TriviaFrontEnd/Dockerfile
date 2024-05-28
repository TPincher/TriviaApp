FROM node:18-alpine
WORKDIR /
COPY public/ /public
COPY src/ /src
RUN npm install
CMD ["npm", "start"]