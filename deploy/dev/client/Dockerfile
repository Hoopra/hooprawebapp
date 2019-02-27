FROM node:11.10.0

ARG FOLDER=/src/client

RUN mkdir -p ${FOLDER}

# ADD package-lock.json ${FOLDER}
# ADD package.json ${FOLDER}

# ENV NODE_PATH=/node_modules
# ENV PATH=$PATH:/node_modules/.bin
WORKDIR ${FOLDER}

RUN npm install -g create-react-app react-scripts-ts typescript
# RUN npm install
EXPOSE 3000
# EXPOSE 35729

# ADD . ${FOLDER}

# ENTRYPOINT ["/bin/bash", "/app/run.sh"]
# CMD ["npm run start"]
CMD npm run start
