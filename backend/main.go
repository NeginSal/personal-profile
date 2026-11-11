package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

//go:embed data/profile.json
var dataFS embed.FS

type Link struct {
	Label string `json:"label"`
	URL   string `json:"url"`
	Icon  string `json:"icon"`
}

type ImageCredit struct {
	Text string `json:"text"`
	URL  string `json:"url"`
}

type Profile struct {
	Greeting    string      `json:"greeting"`
	Role        string      `json:"role"`
	Skills      []string    `json:"skills"`
	LinksTitle  string      `json:"linksTitle"`
	Links       []Link      `json:"links"`
	ImageCredit ImageCredit `json:"imageCredit"`
}

func loadProfile() (Profile, error) {
	var p Profile
	raw, err := dataFS.ReadFile("data/profile.json")
	if err != nil {
		return p, fmt.Errorf("read profile: %w", err)
	}
	if err := json.Unmarshal(raw, &p); err != nil {
		return p, fmt.Errorf("parse profile: %w", err)
	}
	return p, nil
}

func mustLoadProfile() Profile {
	p, err := loadProfile()
	if err != nil {
		panic(err)
	}
	return p
}

var profile = mustLoadProfile()

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("encode error: %v", err)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func profileHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, profile)
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		next.ServeHTTP(w, r)
	})
}

func newMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", healthHandler)
	mux.HandleFunc("GET /api/profile", profileHandler)
	return mux
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           withCORS(newMux()),
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("server listening on :%s", port)
	log.Fatal(srv.ListenAndServe())
}
