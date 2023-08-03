package route

import (
	"QuantumLab/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, db *gorm.DB, engine *gin.Engine) {
	apiRouterGroup := engine.Group("/api")
	NewLoginRouter(env, db, apiRouterGroup)
	//template router
	TemplateRouter(db, apiRouterGroup)
	NewWorkspaceRouter(db, apiRouterGroup)
}
