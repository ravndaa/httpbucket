# Build Standalone executables
cd clientapp
yarn build
#mkdir ../wwwroot
cp -r ./build ../wwwroot
cd ..
rice embed-go
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-X main.UseRice=true" -o ./standalone/linux/httpbucket .
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags "-X main.UseRice=true" -o ./standalone/macos/httpbucket .
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -ldflags "-X main.UseRice=true" -o ./standalone/windows/httpbucket.exe .
