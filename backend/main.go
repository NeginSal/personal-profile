package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

type Link struct {
	Label string `json:"label"`
	URL   string `json:"url"`
}

type Profile struct {
	Name   string   `json:"name"`
	Title  string   `json:"title"`
	About  string   `json:"about"`
	Skills []string `json:"skills"`
	Links  []Link   `json:"links"`
}

type Project struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	URL         string   `json:"url"`
}

var profile = Profile{
	Name:   "Negin Saljooghi",
	Title:  "DevOps Engineer",
	About:  "I build and automate things. This site is my DevOps playground.",
	Skills: []string{"Linux", "kubernetes", "Docker", "Go", "GitHub Actions", "Git"},
	Links: []Link{
		{Label: "GitHub", URL: "https://github.com/NeginSal"},
	},
}

var projects = []Project{
	{
		Name:        "Personal Profile",
		Description: "This website: Go backend, CI/CD pipeline, containerized.",
		Tags:        []string{"Go", "Docker", "GitHub Actions"},
		URL:         "https://github.com/NeginSal/personal-profile",
	},
}

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

func projectsHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, projects)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", healthHandler)
	mux.HandleFunc("GET /api/profile", profileHandler)
	mux.HandleFunc("GET /api/projects", projectsHandler)

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("server listening on :%s", port)
	log.Fatal(srv.ListenAndServe())
}
