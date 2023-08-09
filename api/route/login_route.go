package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewLoginRouter(env *bootstrap.Env, db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	ur := repository.NewUserRepository(db)
	lc := &controller.LoginController{
		LoginUsecase: usecase.NewLoginUC(ur),
		Env:          env,
	}

	authRouterGroup := apiRouterGroup.Group("/auth")
	authRouterGroup.POST("/login", lc.Login)
	authRouterGroup.GET("/currUser", lc.CheckUser)
}
