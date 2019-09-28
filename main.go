package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

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

/*
func listClients(c echo.Context) error {
	for _, client := range clients {
		fmt.Println(client)
	}
}
*/

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
	bucket.GET("/:id", handleGet)
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

func handleGet(c echo.Context) error {
	data := c.Param("id")

	if _, ok := myDB[data]; !ok {

		return nil
	}

	body2, _ := ioutil.ReadAll(c.Request().Body)

	req := ReqMsg{
		Client:   c.Request().UserAgent(),
		Body:     string(body2),
		Headers:  c.Request().Header,
		Host:     c.Request().Host,
		Method:   c.Request().Method,
		URL:      c.Request().RequestURI,
		Fromip:   c.Request().RemoteAddr,
		DateTime: time.Now(),
	}

	*myDB[data] = append(*myDB[data], req)

	reqJSON, _ := json.Marshal(req)
	hub.clients[data].send <- []byte(reqJSON)
	return c.String(200, data)
}

func handlePost(c echo.Context) error {
	data := c.Param("id")

	if _, ok := myDB[data]; !ok {

		return nil
	}

	body2, _ := ioutil.ReadAll(c.Request().Body)

	req := ReqMsg{
		Client:   c.Request().UserAgent(),
		Body:     string(body2),
		Headers:  c.Request().Header,
		Host:     c.Request().Host,
		Method:   c.Request().Method,
		URL:      c.Request().RequestURI,
		Fromip:   c.Request().RemoteAddr,
		DateTime: time.Now(),
	}

	*myDB[data] = append(*myDB[data], req)

	reqJSON, _ := json.Marshal(req)
	hub.clients[data].send <- []byte(reqJSON)
	return c.String(200, data)
}

//ReqMsg ok
type ReqMsg struct {
	Client   string      `json:"client"`
	Headers  http.Header `json:"headers"`
	Body     string      `json:"body"`
	Host     string      `json:"host"`
	Method   string      `json:"method"`
	URL      string      `json:"url"`
	Fromip   string      `json:"fromip"`
	DateTime time.Time   `json:"datetime"`
}
