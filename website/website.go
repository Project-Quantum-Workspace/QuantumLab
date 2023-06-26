package website

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

/*
loadWebsiteAssets loads the website assets from the dist folder, this includes following files:

	index.html(file)
	favicon.ico(file)
	assets(folder)
*/
func loadWebsiteAssets(engine *gin.Engine) {
	engine.LoadHTMLFiles("dist/index.html")
	engine.StaticFS("/assets", http.Dir("dist/assets"))
	engine.StaticFS("/public", http.Dir("public"))
	log.Println("QuantumLab Website Assets Loaded Successfully")
}

/*
setupWebsiteRouterGroup sets up the website router group, which will redirect all the requests except registered routes.
The default router is handled by frontend framework. If you want to add a backend route, you should register it in
the api router group or create another router group.
*/
func setupWebsiteRouterGroup(engine *gin.Engine) {
	engine.NoRoute(func(context *gin.Context) {
		context.HTML(200, "index.html", nil)
	})
}

/*
InitWebsite load the website assets and transfer default router control to frontend framework.
*/
func InitWebsite(engine *gin.Engine) {
	loadWebsiteAssets(engine)
	setupWebsiteRouterGroup(engine)

	log.Println("QuantumLab Frontend Finished Loading")
}
