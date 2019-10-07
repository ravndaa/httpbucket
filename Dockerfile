FROM node:alpine as web
RUN npm -g install yarn
WORKDIR /usr/src
COPY ./clientapp .
RUN yarn && yarn build

# Start from the latest golang base image
FROM golang:alpine as gobuilder
RUN apk add git ca-certificates --update
#RUN mkdir /usr/local/go/src/github.com/app

COPY go.mod /go/src/app/go.mod
COPY *.go /go/src/app/
RUN mkdir /go/src/app/data
WORKDIR /go/src/app

#RUN go get
RUN CGO_ENABLED=0 GOOS=linux go build -o main .


FROM scratch
WORKDIR /app
COPY --from=gobuilder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=gobuilder /go/src/app/main /app
COPY --from=gobuilder /go/src/app/data/ /app/data/
COPY --from=web /usr/src/build /app/wwwroot

VOLUME ["/app/data"]
EXPOSE 1323
CMD ["/app/main"]