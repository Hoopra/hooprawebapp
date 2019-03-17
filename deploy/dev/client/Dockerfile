FROM node:11.10.0

ARG FOLDER=/src/client

RUN mkdir -p ${FOLDER}


WORKDIR ${FOLDER}

RUN npm install -g create-react-app react-scripts-ts typescript

EXPOSE 3000

# ADD package.json .
# ADD . .
# RUN npm install

CMD npm run start
