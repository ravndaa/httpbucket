

[logo]: https://img.icons8.com/dusk/64/000000/scary-tree--v2.png "httpBucket"

# ![alt text][logo] httpBucket
![](https://github.com/ravndaa/spuky/workflows/Docker%20Image%20CI/badge.svg)


Simple HTTP request bin/bucket server easy to run and use.


## TODO
 - Major Code cleaning.
 - Add Comments.
 - Add an admin page.
 - Build standalone executables.
 - check security.
 - UI improvements
 - persistant data.
 - explore and change to gomod



## Build

### Docker
- Linux: CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o httpbucket .
- MacOS: CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -o httpbucket .
- Windows: CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o httpbucket.exe .

### Standalone (Todo: Automate)
- Run first:
    - yarn build
    - copy build to root as wwwroot
    - rice embed-go
- Linux: CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-X main.UseRice=true" -o httpbucket .
- MacOS: CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags "-X main.UseRice=true" -o httpbucket .
- Windows: CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -ldflags "-X main.UseRice=true" -o httpbucket.exe .

## Docker Run
docker run -d --name httpbucket --network web httpbucket:latest


### Learn

# Credits

Icon: <a href="https://icons8.com/icon/nPJ-vAuEzUMX/scary-tree">Scary Tree icon by Icons8</a>