//go:build ignore

package main

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"log"
)

func main() {
	app := bootstrap.App()

	err := app.DB.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatal(err)
	}
}
