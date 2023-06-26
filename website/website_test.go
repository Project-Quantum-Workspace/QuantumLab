package website

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func assertHTTPResponse(t *testing.T, route string, method string, expectedStatusCode int, expectedBody string) {
	t.Helper()
	engine := gin.Default()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(method, route, nil)
	InitWebsite(engine)
	engine.ServeHTTP(w, req)

	if w.Code != expectedStatusCode {
		t.Errorf("Expected status code %d, but got %d", expectedStatusCode, w.Code)
	}

	if expectedBody != "" {
		body := w.Body.String()
		if !strings.Contains(body, expectedBody) {
			t.Errorf("Expected the response to contain '%s', but it did not: %s", expectedBody, body)
		}
	}
}

func TestInitWebsite(t *testing.T) {
	t.Run("Test loading assets files", func(t *testing.T) {
		assertHTTPResponse(t, "/favicon.ico", "GET", http.StatusOK, "")
	})

	t.Run("Test front router", func(t *testing.T) {
		assertHTTPResponse(t, "/nonexistentroute", "GET", http.StatusOK, "<title>QuantumLab</title>")
	})
}
