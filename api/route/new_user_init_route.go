package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewUserInitRouter(apiRouterGroup *gin.RouterGroup, db *gorm.DB, env *bootstrap.Env) {
	ur := repository.NewUserRepository(db)
	nuic := &controller.NewUserInitializerController{
		UserInitUsecase: usecase.NewUserInitUsecase(ur),
	}

	authRouterGroup := apiRouterGroup.Group("/init")
	authRouterGroup.GET("", nuic.CheckHasUser)
	authRouterGroup.POST("", nuic.InitRootAdmin)

}
