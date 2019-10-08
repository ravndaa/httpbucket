package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
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
	for client, bucketid := range hub.clientsv2 {
		if bucketid == id {
			hub.unregister <- client
		}
	}
	/*
		client := hub.clientsv2[id]
		if client != nil {
			hub.unregister <- client
		}*/
	bucket := Bucket{}
	err := db.One("BucketID", id, &bucket)

	if err != nil {
		fmt.Println("GET:", err.Error())
		return c.String(400, err.Error())
	}
	fmt.Println(&bucket)
	err = db.DeleteStruct(&bucket)
	if err != nil {
		fmt.Println(err)
		return c.String(400, err.Error())
	}

	//delete(myDB, id)

	return c.JSON(200, map[string]string{
		"id": id,
	})
}

/*
disconnects the client from ws hub.
*/
func adminhandlerDeleteClient(c echo.Context) error {
	id := c.Param("id")
	for client, bucketid := range hub.clientsv2 {
		if bucketid == id {
			hub.unregister <- client
		}
	}
	/*
		client := hub.clients[id]
		if client != nil {
			hub.unregister <- client
		}*/
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
	//clean := []ReqMsg{}
	// set the empty reqmsg to bucket id..
	//myDB[id] = &clean
	requests := []ReqMsg{}
	err := db.Find("BucketID", id, &requests)
	for _, item := range requests {
		db.Delete("ReqMsg", item.ID)
	}
	if err != nil {
		fmt.Println(err)
		return c.String(400, err.Error())
	}
	return c.JSON(200, map[string]string{
		"id": id,
	})
}

/*
return all buckets in memory.
*/
func adminhandlerListBuckets(c echo.Context) error {
	var resp []Bucket

	db.All(&resp)
	return c.JSON(200, &resp)
}

func adminhandlerListBucketMessages(c echo.Context) error {
	id := c.Param("id")

	var bucket Bucket
	var requests []ReqMsg
	err = db.One("BucketID", id, &bucket)
	err = db.Find("BucketID", id, &requests)
	bucket.Requests = requests
	return c.JSON(200, requests)
}

func adminhandlerListBucketClients(c echo.Context) error {
	id := c.Param("id")
	clients := []string{}

	for client, bucketid := range hub.clientsv2 {
		if bucketid == id {
			ip := client.conn.LocalAddr().String()
			clients = append(clients, ip)
		}
	}

	return c.JSON(200, clients)
}

/*
how to improve?
there is bigger problem if this not exists.
*/
func adminhandlerListClients(c echo.Context) error {

	return c.JSON(200, &hub.clientsv2)
}

/*

 */
func adminhandlerLogin(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	var me User
	db.One("Username", username, &me)
	// Throws unauthorized error
	if username != me.Username || password != me.Password {
		return echo.ErrUnauthorized
	}

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = me.Username
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
