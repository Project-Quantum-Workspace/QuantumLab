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
)

var variables []string

func main() {
	getVariables()
	fmt.Println(variables)

	cmd := exec.Command("./initialisation.sh")
	stdout, err := cmd.Output()
	if err != nil {
		log.Println(err.Error())
		os.Exit(1)
	}
	initLog := string(stdout)

	if initLog == "0\n" {
		log.Println("Initialisation Succeeded")
		issuePostRequest(variables, "Running", "Initialisation Succeeded")
	} else {
		log.Print("Initialisation Failed\t" + initLog)
		issuePostRequest(variables, "Failed", initLog)
		os.Exit(1)
	}
}

// getVariables gets the workspace ID and the corresponding QuantumLab token.
func getVariables() {
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

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		variables = append(variables, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatalln(err)
	}
}

// issuePostRequest issues a POST request to the QuantumLab server.
func issuePostRequest(variables []string, status, content string) {
	params := url.Values{}
	params.Add("workspace_id", variables[0])
	params.Add("quantumlab_token", variables[1])
	params.Add("workspace_status", status)
	params.Add("content", content)

	resp, err := http.PostForm("http://localhost:5432/agent/init", params)
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
