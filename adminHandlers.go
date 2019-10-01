package main

import (
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

/*
deletes bucket and disconnects the wsclient
*/
func adminhandlerDeleteBucket(c echo.Context) error {
	id := c.Param("id")
	client := hub.clients[id]
	if client != nil {
		hub.unregister <- client
	}
	delete(myDB, id)

	return c.JSON(200, map[string]string{
		"id": id,
	})
}

/*
disconnects the client from ws hub.
*/
func adminhandlerDeleteClient(c echo.Context) error {
	id := c.Param("id")
	client := hub.clients[id]
	if client != nil {
		hub.unregister <- client
	}
	return c.JSON(200, map[string]string{
		"id": id,
	})
}

/*
deletes all messages for the bucket.
*/
func adminhandlerDeleteMsgs(c echo.Context) error {
	id := c.Param("id")
	// create a empty ReqMsg
	clean := []ReqMsg{}
	// set the empty reqmsg to bucket id..
	myDB[id] = &clean
	return c.JSON(200, map[string]string{
		"id": id,
	})
}

/*
return all buckets in memory.
*/
func adminhandlerListBuckets(c echo.Context) error {
	resp := []Bucket{}
	// loop the memory bucket. not a problem now, but if many entries is added, this could be a problem...
	for item, msgs := range myDB {
		// check if the ws-client is still active
		online := false
		if _, ok := hub.clients[item]; ok {

			online = true
		}
		// get count of messages.
		stats := len(*msgs)
		// new bucket item.
		bucket := Bucket{
			ID:     item,
			Online: online,
			Stats:  stats,
		}
		// add the bucket item to memory.
		resp = append(resp, bucket)
	}
	return c.JSON(200, &resp)
}

/*
how to improve?
there is bigger problem if this not exists.
*/
func adminhandlerListClients(c echo.Context) error {

	return c.JSON(200, &hub.clients)
}

/*

 */
func adminhandlerLogin(c echo.Context) error {
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
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix() // make it possible to override.

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(*jwtsecret))
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": t,
	})
}
