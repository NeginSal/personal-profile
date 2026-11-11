package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func doGet(t *testing.T, path string) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodGet, path, nil)
	rec := httptest.NewRecorder()
	newMux().ServeHTTP(rec, req)
	return rec
}

func TestHealth(t *testing.T) {
	rec := doGet(t, "/health")

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var body map[string]string
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if body["status"] != "ok" {
		t.Errorf("expected status ok, got %q", body["status"])
	}
}

func TestProfile(t *testing.T) {
	rec := doGet(t, "/api/profile")

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var p Profile
	if err := json.NewDecoder(rec.Body).Decode(&p); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if p.Greeting == "" || p.Role == "" {
		t.Error("greeting and role should not be empty")
	}
	if len(p.Skills) == 0 {
		t.Error("profile should have at least one skill")
	}
	if len(p.Links) == 0 {
		t.Error("profile should have at least one link")
	}
}

func TestProfileDataIsValid(t *testing.T) {
	p, err := loadProfile()
	if err != nil {
		t.Fatalf("load profile: %v", err)
	}
	for _, l := range p.Links {
		if l.Label == "" || l.Icon == "" {
			t.Errorf("link %+v needs a label and an icon", l)
		}
		if !strings.HasPrefix(l.URL, "https://") {
			t.Errorf("link %q must use https, got %q", l.Label, l.URL)
		}
	}
}

func TestProjectsRouteRemoved(t *testing.T) {
	rec := doGet(t, "/api/projects")

	if rec.Code != http.StatusNotFound {
		t.Errorf("expected 404, got %d", rec.Code)
	}
}

func TestWrongMethod(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/health", nil)
	rec := httptest.NewRecorder()

	newMux().ServeHTTP(rec, req)

	if rec.Code != http.StatusMethodNotAllowed {
		t.Errorf("expected 405, got %d", rec.Code)
	}
}
