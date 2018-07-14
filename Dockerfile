FROM node:8

# RUN apt-get update && \
#     apt-get install mc -y

# ENV TERM=xterm

# pull app from github
# RUN git clone https://github.com/cnstntn-kndrtv/pushkin-vk.git

# or local build
ADD . /pushkin-vk

WORKDIR /pushkin-vk

RUN npm install

EXPOSE 3005
EXPOSE 3443
VOLUME /data/cert

RUN npm run pack
CMD npm run start