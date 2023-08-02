//go:build ignore

package main

import (
	"QuantumLab/bootstrap"
	"QuantumLab/model"
	"log"
)

func main() {
	app := bootstrap.App()

	err := app.DB.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatal(err)
	}
}
