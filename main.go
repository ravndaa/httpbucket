package main

import (
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

func main() {
	myDB = make(map[string]*[]ReqMsg)

	e := echo.New()
	e.HideBanner = true

	hub = newHub()
	go hub.run()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//e.POST("/sendmsg", sendMsg)
	bucket := e.Group("/bucket")
	bucket.POST("/:id", handlePost)
	bucket.GET("/:id", handlePost)
	bucket.GET("/ws", handleWs)
	/*
		e.POST("/bucket/:id", handlePost)
		e.GET("/bucket/:id", handleGet)
		e.GET("/ws", handleWs)
	*/
	api := e.Group("/api")
	api.GET("/bucket/:id", handlerGetRequests)
	api.POST("/createbucket", handlerCreateBucket)
	//api.GET("/ws", handleWs)

	//e.File("/*", "wwwroot/index.html")
	e.Static("/", "wwwroot")
	e.Logger.Debug(e.Start(":1323"))
}
