/*
handlers for the bucket.
*/
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/url"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

/*
creates a new bucket in memory, and return the id.
*/
func handlerBucketCreate(c echo.Context) error {
	// create a random string used as -id.
	id := RandomString(9)
	// create the bucket.

	bucket := Bucket{
		BucketID: id,
	}
	fmt.Println(bucket)

	//myDB[id] = new([]ReqMsg)
	err := db.Save(&bucket)

	if err != nil {
		fmt.Println(err)
		return c.String(400, err.Error())
	}

	return c.JSON(200, bucket)
}

/*
	Returns the request made to the bucket.
*/
func handlerGetBucketRequests(c echo.Context) error {
	id := c.Param("id")

	/*
		// Check if map of bucket contains the id.
		if _, ok := myDB[id]; !ok {

			return c.NoContent(400)
		}
		myDB[id]
	*/
	var bucket Bucket
	var requests []ReqMsg
	err = db.One("BucketID", id, &bucket)
	err = db.Find("BucketID", id, &requests)
	bucket.Requests = requests
	return c.JSON(200, bucket)
}

// store and send messages received for a bucket
func handleBucketRequest(c echo.Context) error {
	data := c.Param("id")
	/*
		if _, ok := myDB[data]; !ok {

			return echo.ErrBadRequest
		}
	*/
	//var bucket Bucket
	// Handle IP, often used behind proxy. checked with traefik
	// add alternative if this is empty.
	realip := c.Request().Header.Get("X-Forwarded-For")

	body2, _ := ioutil.ReadAll(c.Request().Body)
	req := ReqMsg{
		BucketID: data,
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
	//*myDB[data] = append(*myDB[data], req)

	err := db.Save(&req)
	if err != nil {
		return c.String(400, err.Error())
	}

	//_ = db.UpdateField(&Bucket{BucketID: data}, "Requests", req)

	reqJSON, _ := json.Marshal(req)

	for client, bucketid := range hub.clientsv2 {
		if bucketid == data {
			client.send <- []byte(reqJSON)
		}
	}
	/*
		if _, ok := hub.clients[data]; ok {

			hub.clients[data].send <- []byte(reqJSON)
		}
	*/
	return c.String(200, data)
}

/*
Generate Postman v2.1 file.
Should probably created a template.json file and changed some variables.. =)
Can't find enought info from request, so will this needs to be a post request with some data.. =)
*/
func handleBucketPostmanFile(c echo.Context) error {
	data := c.Param("id")
	//urlquery := c.QueryParam("url")
	var err error

	requestData := new(CreatePostmanRequest)
	if err = c.Bind(requestData); err != nil {
		return echo.ErrBadRequest
	}

	// working
	fullurl := requestData.URL
	//baseRequestInfo := c.Request()
	urldata, _ := url.Parse(fullurl)
	urlSchema := urldata.Scheme
	fmt.Println(urldata.EscapedPath())

	hostArray := strings.Split(urldata.Hostname(), ".")
	port := urldata.Port()
	path := strings.Split(strings.Replace(urldata.EscapedPath(), "/", "", 1), "/")
	guid := uuid.New()

	//hostArray := []string{}

	postmanInfo := PostmanInfo{
		ID:     fmt.Sprintf("%s", guid),
		Name:   fmt.Sprintf("httpBucket - %s", data),
		Schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
	}

	postmanItems := []PostmanItem{
		PostmanItem{
			Name: "httpBucket-POST",
			Request: PostmanItemRequest{
				Method: "POST",
				Header: []PostmanItemRequestHeader{
					PostmanItemRequestHeader{
						Key:   "Content-Type",
						Name:  "Content-Type",
						Value: "text/plain",
						Type:  "text",
					},
					PostmanItemRequestHeader{
						Key:   "httpBucket",
						Value: "isRocking",
						Type:  "text",
					},
				},
				Body: PostmanItemRequestBody{
					Mode: "raw",
					Raw:  "httpBucket Rocks",
					Options: PostmanItemRequestBodyOptions{
						Raw: PostmanItemRequestBodyOptionsRaw{
							Language: "text",
						},
					},
				},
				URL: PostmanItemRequestURL{
					Raw:      fullurl,
					Protocol: urlSchema,
					Host:     hostArray,
					Port:     port,
					Path:     path,
				},
				Description: "httpBucket POST Request",
			},
			Response: []PostmanItemResponse{},
		},
		PostmanItem{
			Name: "httpBucket-Get",
			Request: PostmanItemRequest{
				Method: "GET",
				Header: []PostmanItemRequestHeader{
					PostmanItemRequestHeader{
						Key:   "Content-Type",
						Name:  "Content-Type",
						Value: "text/plain",
						Type:  "text",
					},
					PostmanItemRequestHeader{
						Key:   "httpBucket",
						Value: "isRocking",
						Type:  "text",
					},
				},
				URL: PostmanItemRequestURL{
					Raw:      fullurl,
					Protocol: urlSchema,
					Host:     hostArray,
					Port:     port,
					Path:     path,
				},
				Description: "httpBucket GET Request",
			},
			Response: []PostmanItemResponse{},
		},
		PostmanItem{
			Name: "httpBucket-PUT",
			Request: PostmanItemRequest{
				Method: "PUT",
				Header: []PostmanItemRequestHeader{
					PostmanItemRequestHeader{
						Key:   "Content-Type",
						Name:  "Content-Type",
						Value: "text/plain",
						Type:  "text",
					},
					PostmanItemRequestHeader{
						Key:   "httpBucket",
						Value: "isRocking",
						Type:  "text",
					},
				},
				Body: PostmanItemRequestBody{
					Mode: "raw",
					Raw:  "httpBucket Rocks",
					Options: PostmanItemRequestBodyOptions{
						Raw: PostmanItemRequestBodyOptionsRaw{
							Language: "text",
						},
					},
				},
				URL: PostmanItemRequestURL{
					Raw:      fullurl,
					Protocol: urlSchema,
					Host:     hostArray,
					Port:     port,
					Path:     path,
				},
				Description: "httpBucket PUT Request",
			},
			Response: []PostmanItemResponse{},
		},
		PostmanItem{
			Name: "httpBucket-PATCH",
			Request: PostmanItemRequest{
				Method: "PATCH",
				Header: []PostmanItemRequestHeader{
					PostmanItemRequestHeader{
						Key:   "Content-Type",
						Name:  "Content-Type",
						Value: "text/plain",
						Type:  "text",
					},
					PostmanItemRequestHeader{
						Key:   "httpBucket",
						Value: "isRocking",
						Type:  "text",
					},
				},
				Body: PostmanItemRequestBody{
					Mode: "raw",
					Raw:  "httpBucket Rocks",
					Options: PostmanItemRequestBodyOptions{
						Raw: PostmanItemRequestBodyOptionsRaw{
							Language: "text",
						},
					},
				},
				URL: PostmanItemRequestURL{
					Raw:      fullurl,
					Protocol: urlSchema,
					Host:     hostArray,
					Port:     port,
					Path:     path,
				},
				Description: "httpBucket PATCH Request",
			},
			Response: []PostmanItemResponse{},
		},
		PostmanItem{
			Name: "httpBucket-DELETE",
			Request: PostmanItemRequest{
				Method: "DELETE",
				Header: []PostmanItemRequestHeader{
					PostmanItemRequestHeader{
						Key:   "Content-Type",
						Name:  "Content-Type",
						Value: "text/plain",
						Type:  "text",
					},
					PostmanItemRequestHeader{
						Key:   "httpBucket",
						Value: "isRocking",
						Type:  "text",
					},
				},
				Body: PostmanItemRequestBody{
					Mode: "raw",
					Raw:  "httpBucket Rocks",
					Options: PostmanItemRequestBodyOptions{
						Raw: PostmanItemRequestBodyOptionsRaw{
							Language: "text",
						},
					},
				},
				URL: PostmanItemRequestURL{
					Raw:      fullurl,
					Protocol: urlSchema,
					Host:     hostArray,
					Port:     port,
					Path:     path,
				},
				Description: "httpBucket DELETE Request",
			},
			Response: []PostmanItemResponse{},
		},
	}

	postmanData := Postman{
		Info: postmanInfo,
		Item: postmanItems,
	}

	return c.JSON(200, postmanData)
}
