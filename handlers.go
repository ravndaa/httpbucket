package main

import (
	"encoding/json"
	"io/ioutil"
	"time"

	"github.com/labstack/echo"
)

/*
func handler(c echo.Context) error {

	return nil
}
*/

func handlerCreateBucket(c echo.Context) error {
	//id := c.Param("id")

	id := String(9)

	myDB[id] = new([]ReqMsg)

	return c.String(200, id)
}

func handlerGetRequests(c echo.Context) error {
	id := c.Param("id")

	if _, ok := myDB[id]; !ok {

		return nil
	}

	return c.JSON(200, myDB[id])
}

func handlePost(c echo.Context) error {
	data := c.Param("id")

	if _, ok := myDB[data]; !ok {

		return nil
	}

	// Handle IP, often used behind proxy. checked with traefik
	realip := c.Request().Header.Get("X-Forwarded-For")

	body2, _ := ioutil.ReadAll(c.Request().Body)

	req := ReqMsg{
		Client:   c.Request().UserAgent(),
		Body:     string(body2),
		Headers:  c.Request().Header,
		Host:     c.Request().Host,
		Method:   c.Request().Method,
		URL:      c.Request().RequestURI,
		Fromip:   realip, //c.Request().RemoteAddr,
		DateTime: time.Now(),
	}

	*myDB[data] = append(*myDB[data], req)

	reqJSON, _ := json.Marshal(req)
	hub.clients[data].send <- []byte(reqJSON)
	return c.String(200, data)
}
