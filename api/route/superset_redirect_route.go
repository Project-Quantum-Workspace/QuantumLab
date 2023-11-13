package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/gin-gonic/gin"
)

func NewRedirectRouter(apiRouterGroup *gin.RouterGroup, env *bootstrap.Env) {
	rc := &controller.RedirectController{Env: env}
	redirectGroup := apiRouterGroup.Group("/redirect")
	redirectGroup.GET("/superset", rc.RedirectSuperset)
}
