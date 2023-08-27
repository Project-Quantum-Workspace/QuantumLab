// The main entry point of QuantumLab Agent
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/Project-Quantum-Workspace/QuantumLab/agent/model"
	"gopkg.in/yaml.v3"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"
)

var conf *model.Conf

func main() {
	var err error
	conf, err = readAgentConf("config.yaml")
	if err != nil {
		log.Fatal(err)
	}

	// Execute the initialisation script.
	cmd := exec.Command("./initialisation.sh")
	stdout, err := cmd.Output()
	if err != nil {
		log.Println(err.Error())
		os.Exit(1)
	}
	initLog := string(stdout)

	// The initialisation process fails.
	if initLog != "0\n" {
		log.Print("Initialisation Failed\n\t" + initLog)
		issuePostRequest("Failed", initLog)
		os.Exit(1)
	}

	// The initialisation process succeeds.
	log.Println("Initialisation Succeeded")
	issuePostRequest("Running", "Initialisation Succeeded")

	// TODO: Send heartbeat messages to the QuantumLab server.
	for {
		time.Sleep(3 * time.Second)
		issuePostRequest("Running", "Workspace Alive")
	}
}

// Parse the config yaml file.
func readAgentConf(filename string) (*model.Conf, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	agentConf := &model.Conf{}
	err = yaml.Unmarshal(data, agentConf)
	if err != nil {
		return nil, err
	}

	return agentConf, nil
}

// issuePostRequest issues a POST request to the QuantumLab server.
func issuePostRequest(status, msg string) {
	workspaceID := conf.Workspace.ID
	workspaceOwner := conf.Workspace.Owner
	quantumlabToken := conf.Metadata.Token
	quantumlabURL := conf.Metadata.URL

	body := map[string]string{
		"workspaceID":     workspaceID,
		"workspaceOwner":  workspaceOwner,
		"quantumlabToken": quantumlabToken,
		"workspaceStatus": status,
		"msg":             msg,
	}

	jsonBody, _ := json.Marshal(body)

	resp, err := http.Post(quantumlabURL, "application/json", bytes.NewBuffer(jsonBody))

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	bodyString := string(bodyBytes)
	fmt.Println(bodyString)
}
