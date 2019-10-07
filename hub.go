package main

//Hub ok
type Hub struct {
	// Registered clients.
	//clients map[string]*Client

	// clients fix -> only one connection pr bucket.
	clientsv2 map[*Client]string

	// bucket connections (a group basically)
	buckets map[string]*Client

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		//clients:    make(map[string]*Client),
		clientsv2: make(map[*Client]string),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			//h.clients[client.id] = client
			h.clientsv2[client] = client.id
			// client.send <- []byte(client.id)
		case client := <-h.unregister:
			/*	if _, ok := h.clients[client.id]; ok {
				delete(h.clients, client.id)
				close(client.send)
			} */
			if _, ok := h.clientsv2[client]; ok {
				delete(h.clientsv2, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			/*
				for _, client := range h.clients {
					select {
					case client.send <- message:
					default:
						close(client.send)
						delete(h.clients, client.id)
					}
				}
			*/
			for client, _ := range h.clientsv2 {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clientsv2, client)
				}
			}
		}
	}
}
