FROM node:alpine

RUN apk add git gpg

CMD [ "tail", "-f" "/dev/null" ]