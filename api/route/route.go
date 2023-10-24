package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/middleware"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, db *gorm.DB, rdb *gorm.DB, engine *gin.Engine, workspaceMonitor map[string]string) {
	publicApiRouterGroup := engine.Group("/api")
	NewUserInitRouter(publicApiRouterGroup, db, env)
	NewLoginRouter(publicApiRouterGroup, db, env)
	NewOAuthRouter(*publicApiRouterGroup, db, env)
	NewAgentRouter(db, publicApiRouterGroup, workspaceMonitor)

	privateApiRouterGroup := engine.Group("/api")
	privateApiRouterGroup.Use(middleware.JwtAuthenticator(env.AccessJWTSecret))
	NewUserAdminRouter(privateApiRouterGroup, db, env)
	NewSettingRouter(privateApiRouterGroup, db, env)
	NewTemplateRouter(env, db, privateApiRouterGroup)
	NewWorkspaceRouter(privateApiRouterGroup, db, env)
	NewResultRouter(privateApiRouterGroup, rdb)
	NewTokenRouter(privateApiRouterGroup, db, env)
}
