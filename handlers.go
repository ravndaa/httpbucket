package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

/*
func handler(c echo.Context) error {

	return nil
}
*/

func handlerLogin(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	// Throws unauthorized error
	if username != *adminusername || password != *adminpassword {
		return echo.ErrUnauthorized
	}

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = *adminusername
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(*jwtsecret))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": t,
	})
}

func handlerCreateBucket(c echo.Context) error {
	//id := c.Param("id")

	id := RandomString(9)

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
