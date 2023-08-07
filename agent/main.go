// The main entry point of QuantumLab Agent
package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"time"
)

// An array consisting of the workspace ID and the QuantumLab token
var credential [2]string

// A struct consisting of environment variables
var env = newEnv()

func main() {
	// Get the workspace ID and the QuantumLab token from a file.
	getCredential()

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

// getCredential gets the workspace ID and the corresponding QuantumLab token.
func getCredential() {
	file, err := os.Open("variables")
	if err != nil {
		log.Fatalln(err)
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(file)

	i := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		credential[i] = scanner.Text()
		i++
	}
	if err := scanner.Err(); err != nil {
		log.Fatalln(err)
	}
}

// issuePostRequest issues a POST request to the QuantumLab server.
func issuePostRequest(status, content string) {
	params := url.Values{}
	params.Add("workspace_id", credential[0])
	params.Add("quantumlab_token", credential[1])
	params.Add("workspace_status", status)
	params.Add("content", content)

	resp, err := http.PostForm(
		fmt.Sprintf("%v://%v:%v/agent/init", env.Protocol, env.QuantumLabHost, env.QuantumLabPort), params)
	if err != nil {
		log.Println("Request Failed\t" + err.Error())
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Println(err)
		}
	}(resp.Body)
}
