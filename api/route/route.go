package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/middleware"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, db *gorm.DB, engine *gin.Engine) {
	publicApiRouterGroup := engine.Group("/api")
	NewLoginRouter(env, db, publicApiRouterGroup)
	NewSignupRouter(db, publicApiRouterGroup)
	//template router
	privateApiRouterGroup := engine.Group("/api")
	privateApiRouterGroup.Use(middleware.JwtAuthenticator(env.AccessJWTSecret))
	TemplateRouter(db, privateApiRouterGroup)
	NewWorkspaceRouter(db, privateApiRouterGroup)
}
