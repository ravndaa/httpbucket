package main

import (
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
