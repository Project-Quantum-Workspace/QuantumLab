package main

import (
	"bytes"
	"encoding/json"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"io"
	"net/http"
	"testing"
)

func TestNewTable(t *testing.T) {
	apiURL := "http://localhost:8080/api/results"
	testRequest := model.CreateTableRequest{
		TableName:   "myTable",
		ColumnCount: 2,
		RowCount:    2,
		ColumnName:  []string{"cA", "cB"},
		ColumnDatatype: map[string]string{
			"cA": "integer",
			"cB": "character varying(255)",
		},
		ColumnData: map[string][]string{
			"cA": []string{"1", "2"},
			"cB": []string{"a", "b"},
		},
	}
	jsonData, err := json.Marshal(testRequest)
	if err != nil {
		t.Errorf("Error: %s", err)
		return
	}
	request, err := http.NewRequest("POST", apiURL, bytes.NewBuffer([]byte(string(jsonData))))
	if err != nil {
		t.Errorf("Error creating request: %s", err)
		return
	}
	request.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		t.Errorf("Error: %s", err)
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			t.Errorf("Error: %s", err)
		}
	}(response.Body)

	responseBody, err := io.ReadAll(response.Body)
	if err != nil {
		t.Errorf("Error reading response body: %s", err)
		return
	}

	if response.StatusCode != http.StatusOK {
		t.Errorf("Response Body: %s", string(responseBody))
	}

}
