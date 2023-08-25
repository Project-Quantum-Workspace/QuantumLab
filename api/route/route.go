package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/middleware"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, db *gorm.DB, rdb *gorm.DB, engine *gin.Engine) {
	publicApiRouterGroup := engine.Group("/api")
	NewLoginRouter(env, db, publicApiRouterGroup)
	NewSignupRouter(db, publicApiRouterGroup)
	privateApiRouterGroup := engine.Group("/api")
	privateApiRouterGroup.Use(middleware.JwtAuthenticator(env.AccessJWTSecret))
	//template router
	TemplateRouter(db, privateApiRouterGroup)
	NewWorkspaceRouter(db, privateApiRouterGroup)
	NewResultRouter(rdb, privateApiRouterGroup)
}
