/*
handlers for the bucket.
*/
package main

import (
	"encoding/json"
	"io/ioutil"
	"time"

	"github.com/labstack/echo"
)

/*
creates a new bucket in memory, and return the id.
*/
func handlerBucketCreate(c echo.Context) error {
	// create a random string used as -id.
	id := RandomString(9)
	// create the bucket.
	myDB[id] = new([]ReqMsg)

	return c.JSON(200, map[string]string{
		"id": id,
	})
}

/*
	Returns the request made to the bucket.
*/
func handlerGetBucketRequests(c echo.Context) error {
	id := c.Param("id")

	// Check if map of bucket contains the id.
	if _, ok := myDB[id]; !ok {

		return c.NoContent(400)
	}

	return c.JSON(200, myDB[id])
}

func handleBucketRequest(c echo.Context) error {
	data := c.Param("id")

	if _, ok := myDB[data]; !ok {

		return echo.ErrBadRequest
	}

	// Handle IP, often used behind proxy. checked with traefik
	// add alternative if this is empty.
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
		Cookies:  c.Request().Cookies(),
		DateTime: time.Now(),
	}
	//add request to bucket.
	*myDB[data] = append(*myDB[data], req)

	reqJSON, _ := json.Marshal(req)
	hub.clients[data].send <- []byte(reqJSON)
	return c.String(200, data)
}
