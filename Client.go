package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/gorilla/websocket"
)

// Client ok
type Client struct {
	hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte
	id   string
}

// Client to HUB
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		//message = bytes.TrimSpace(bytes.Replace(message))
		c.hub.broadcast <- message
	}
}

// Hub to CLient
func (c *Client) writePump() {

	defer func() {

		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:

			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {

				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}

		}
	}
}

func serveWs(hub *Hub, c echo.Context, id string) {

	socket := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	conn, err := socket.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println(err)
		return
	}

	//id := String(9)
	fmt.Println(id)

	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256), id: id}
	client.hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}
