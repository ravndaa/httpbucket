package main

import (
	"bytes"
	"flag"
	"fmt"
	"net/http"
	"os"

	rice "github.com/GeertJohan/go.rice"
	"github.com/dimiro1/banner"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	upgrader = websocket.Upgrader{}
)

/*
// Delete this ..
func sendAll(msg string) {
	hub.broadcast <- []byte(msg)
}
// Delete this ..
func sendMsg(c echo.Context) error {
	msg := c.FormValue("msg")
	go sendAll(msg)
	return c.NoContent(201)
}
*/

// maybe implement a simple security check.
// could be a problem with how websocket is implemented.
// what happens when to browser connect to same bucket
func handleWs(c echo.Context) error {
	id := c.QueryParam("id")
	if _, ok := myDB[id]; ok {
		serveWs(hub, c, id)
		return nil
	}

	return c.NoContent(400)
}

type memDB struct {
}

var hub *Hub
var myDB map[string]*[]ReqMsg
var adminusername, adminpassword, jwtsecret *string

// UseRice variable from the build process => -ldflags "-X main.UseRice=true"
var UseRice string

func main() {

	isEnabled := true
	isColorEnabled := true
	banner.Init(os.Stdout, isEnabled, isColorEnabled, bytes.NewBufferString(logoBanner))
	//Environment variables
	adminuser := os.Getenv("adminusername")
	if adminuser == "" {
		adminuser = "admin@local"
	}

	// set a minimum rule for this
	adminpass := os.Getenv("adminpassword")
	if adminpass == "" {
		adminpass = "admin"
	}

	// set a minimum rule for this
	tokensecret := os.Getenv("secret")
	if tokensecret == "" {
		tokensecret = "AVCerFDvgdrev%dsgsvdxfgsrwgsdg"
	}

	// Load username and password from cmd
	adminusername = flag.String("username", adminuser, "Admin user.")
	adminpassword = flag.String("password", adminpass, "Admin password.")
	jwtsecret = flag.String("jwtsecret", tokensecret, "JWT signing secret.")
	flag.Parse()
	fmt.Printf("%s => %s => %s \n", *adminusername, *adminpassword, *jwtsecret)

	// create the memory map for buckets and requests.
	myDB = make(map[string]*[]ReqMsg)

	e := echo.New()
	e.HideBanner = true

	// Start the hub...
	hub = newHub()
	go hub.run()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// handle login requeste..
	e.POST("/login", adminhandlerLogin)

	//
	bucket := e.Group("/b")
	/*
		bucket.POST("/:id", handleBucketRequest)
		bucket.GET("/:id", handleBucketRequest)
		bucket.DELETE("/:id", handleBucketRequest)
		bucket.PATCH("/:id", handleBucketRequest)
		bucket.PUT("/:id", handleBucketRequest)
	*/
	bucket.Any("/:id", handleBucketRequest)

	bucket.GET("/createpostman/:id", handleBucketPostmanFile)
	bucket.GET("/ws", handleWs)
	bucket.POST("/create", handlerBucketCreate)
	bucket.GET("/list/:id", handlerGetBucketRequests)

	// Admin api, need jwt token.
	api := e.Group("/api")
	api.Use(middleware.JWT([]byte(*jwtsecret)))
	api.GET("/listbuckets", adminhandlerListBuckets)
	api.GET("/listclients", adminhandlerListClients)
	api.DELETE("/bucket/:id", adminhandlerDeleteBucket)
	api.DELETE("/client/:id", adminhandlerDeleteClient)
	api.DELETE("/msgs/:id", adminhandlerDeleteMsgs)

	// Some magic tricks that checks if embedded and uses that, or else uses "./wwwroot" next to it.
	// this needs build variable -ldflags "-X main.UseRice=true"
	if UseRice == "true" {
		// docker build will not use this.
		// check if this could be a *security* issue, if we don't disable look for folder "wwwroot" next to the executable. (rice feature)
		rice.Debug = true // make this possible to override.
		assetHandler := http.FileServer(rice.MustFindBox("./wwwroot").HTTPBox())
		e.GET("/*", echo.WrapHandler(assetHandler))
	} else {
		e.Static("/", "./wwwroot")
	}

	e.Logger.Debug(e.Start(":1323"))
}
