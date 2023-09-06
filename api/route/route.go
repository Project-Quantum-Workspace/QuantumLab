package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/middleware"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, db *gorm.DB, rdb *gorm.DB, engine *gin.Engine, workspaceMonitor map[string]string) {
	publicApiRouterGroup := engine.Group("/api")
	NewLoginRouter(env, db, publicApiRouterGroup)
	NewAgentRouter(db, publicApiRouterGroup, workspaceMonitor)

	privateApiRouterGroup := engine.Group("/api")
	privateApiRouterGroup.Use(middleware.JwtAuthenticator(env.AccessJWTSecret))
	NewUserAdminRouter(privateApiRouterGroup, db, env)
	NewTemplateRouter(env, db, privateApiRouterGroup)
	NewWorkspaceRouter(privateApiRouterGroup, db, env)
	NewResultRouter(rdb, privateApiRouterGroup)
}
