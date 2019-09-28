package main

import (
	"net/http"
	"time"
)

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
