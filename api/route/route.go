package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, db *gorm.DB, rdb *gorm.DB, engine *gin.Engine) {
	apiRouterGroup := engine.Group("/api")

	NewLoginRouter(env, db, apiRouterGroup)
	NewUserAdminRouter(env, db, apiRouterGroup)

	NewTemplateRouter(db, apiRouterGroup)
	NewWorkspaceRouter(db, apiRouterGroup)
	NewResultRouter(rdb, apiRouterGroup)
}
