package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"

	rice "github.com/GeertJohan/go.rice"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	upgrader = websocket.Upgrader{}
)

func sendAll(msg string) {
	/*	for _, item := range clients {

		}
	*/
	hub.broadcast <- []byte(msg)
}

func sendMsg(c echo.Context) error {
	msg := c.FormValue("msg")
	go sendAll(msg)
	return c.NoContent(201)
}

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

	//Environment variables
	adminuser := os.Getenv("adminusername")
	if adminuser == "" {
		adminuser = "admin@local"
	}

	adminpass := os.Getenv("adminpassword")
	if adminpass == "" {
		adminpass = "admin"
	}

	// Load username and password from cmd
	adminusername = flag.String("username", adminuser, "Admin user.")
	adminpassword = flag.String("password", adminpass, "Admin password.")
	jwtsecret = flag.String("jwtsecret", "AVCerFDvgdrev%dsgsvdxfgsrwgsdg", "JWT signing secret.")
	flag.Parse()
	fmt.Printf("%s => %s => %s \n", *adminusername, *adminpassword, *jwtsecret)

	myDB = make(map[string]*[]ReqMsg)

	e := echo.New()
	e.HideBanner = true

	hub = newHub()
	go hub.run()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// cleaning and maybe rename to "b" instead of "bucket"
	bucket := e.Group("/bucket")
	bucket.POST("/:id", handlePost)
	bucket.GET("/:id", handlePost)
	bucket.GET("/ws", handleWs)

	// Todo: add protection.
	api := e.Group("/api")
	api.GET("/bucket/:id", handlerGetRequests)
	api.POST("/createbucket", handlerCreateBucket)
	api.POST("/login", handlerLogin)
	api.GET("/listbuckets", handlerListBuckets)
	api.GET("/listclients", handlerListClients)
	api.DELETE("/bucket/:id", handlerDeleteBucket)
	api.DELETE("/client/:id", handlerDeleteClient)
	api.DELETE("/msgs/:id", handlerDeleteMsgs)

	// change so that docker does not use this...
	// Some magic tricks that checks if embedded and uses that, or else uses "./wwwroot" next to it.
	if UseRice == "true" {
		rice.Debug = true
		assetHandler := http.FileServer(rice.MustFindBox("./wwwroot").HTTPBox())
		// serves the index.html from rice
		e.GET("/*", echo.WrapHandler(assetHandler))
	} else {
		e.Static("/", "./wwwroot")
	}

	e.Logger.Debug(e.Start(":1323"))
}
