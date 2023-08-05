package main

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/route"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	_ "github.com/Project-Quantum-Workspace/QuantumLab/docs"
	"github.com/Project-Quantum-Workspace/QuantumLab/website"
	"log"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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

	// Load website assets and router.
	website.InitWebsite(engine)

	// Load API router.
	route.Setup(app.Env, app.DB, engine)

	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	engine.GET("/healthz", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "ok",
		})
	})

	err := engine.Run()
	if err != nil {
		log.Fatal("Error Starting Server")
	}
}
