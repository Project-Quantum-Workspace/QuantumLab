package main

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/route"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/docs"
	"github.com/Project-Quantum-Workspace/QuantumLab/website"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"
)

// @title           QuantumLab Gin Web Service
// @version         1.0
// @description     A web service API in Go using the Gin framework

// @contact.name    Quanchi Chen
// @contact.email   quanchic@student.unimelb.edu.au

// @BasePath        /api

func main() {
	app := bootstrap.App()
	engine := gin.Default()

	docs.SwaggerInfo.BasePath = "/"

	// Load website assets and router.
	website.InitWebsite(engine)

	// Load API router.
	route.Setup(app.Env, app.DB, engine)

	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	err := engine.Run()
	if err != nil {
		log.Fatal("Error Starting Server")
	}
}
