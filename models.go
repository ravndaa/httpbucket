package main

import (
	"net/http"
	"time"
)

//User ok
type User struct {
	ID       int    `storm:"id,increment"`
	Username string `json:"username" storm:"index,unique"`
	Password string
}

//Bucket  hmm
type Bucket struct {
	ID       int      `json:"id" storm:"id,increment"`
	BucketID string   `json:"bucketid" storm:"index,unique"`
	Requests []ReqMsg `json:"requests" storm:"inline"`
}

// Requests []ReqMsg `json:"requests" storm:"inline"`

//ReqMsg ok
type ReqMsg struct {
	ID       int            `json:"id" storm:"id,increment"`
	BucketID string         `json:"bucketid" storm:"index"`
	Client   string         `json:"client"`
	Headers  http.Header    `json:"headers"`
	Body     string         `json:"body"`
	Cookies  []*http.Cookie `json:"cookies"`
	Host     string         `json:"host"`
	Method   string         `json:"method"`
	URL      string         `json:"url"`
	Fromip   string         `json:"fromip"`
	DateTime time.Time      `json:"datetime"`
}

//Bucketold hmm
type Bucketold struct {
	ID     string `json:"id"`
	Online bool   `json:"online"`
	Stats  int    `json:"stats"`
}

// CreatePostmanRequest ok
type CreatePostmanRequest struct {
	URL string `json:"url"`
}

//Postman model
type Postman struct {
	Info                    PostmanInfo             `json:"info"`
	Item                    []PostmanItem           `json:"item"`
	ProtocolProfileBehavior ProtocolProfileBehavior `json:"protocolProfileBehavior"`
}

//PostmanInfo model
type PostmanInfo struct {
	ID     string `json:"_postman_id"`
	Name   string `json:"name"`
	Schema string `json:"schema"`
}

// PostmanItem ok
type PostmanItem struct {
	Name     string                `json:"name"`
	Request  PostmanItemRequest    `json:"request"`
	Response []PostmanItemResponse `json:"response"`
}

// PostmanItemRequest ok
type PostmanItemRequest struct {
	Method      string                     `json:"method"`
	Header      []PostmanItemRequestHeader `json:"header"`
	Body        PostmanItemRequestBody     `json:"body,omitempty"`
	URL         PostmanItemRequestURL      `json:"url"`
	Description string                     `json:"description"`
}

// PostmanItemRequestHeader ok
type PostmanItemRequestHeader struct {
	Key   string `json:"key"`
	Name  string `json:"name,omitempty"`
	Value string `json:"value"`
	Type  string `json:"type"`
}

// PostmanItemRequestBody ok
type PostmanItemRequestBody struct {
	Mode    string                        `json:"mode"`
	Raw     string                        `json:"raw"`
	Options PostmanItemRequestBodyOptions `json:"options"`
}

// PostmanItemRequestBodyOptions ok
type PostmanItemRequestBodyOptions struct {
	Raw PostmanItemRequestBodyOptionsRaw `json:"raw"`
}

//PostmanItemRequestBodyOptionsRaw ok
type PostmanItemRequestBodyOptionsRaw struct {
	Language string `json:"language"`
}

// PostmanItemRequestURL ok
type PostmanItemRequestURL struct {
	Raw      string   `json:"raw"`
	Protocol string   `json:"protocol"`
	Host     []string `json:"host"`
	Port     string   `json:"port,omitempty"`
	Path     []string `json:"path"`
}

// PostmanItemResponse ok
type PostmanItemResponse struct {
}

// ProtocolProfileBehavior ok
type ProtocolProfileBehavior struct {
}
