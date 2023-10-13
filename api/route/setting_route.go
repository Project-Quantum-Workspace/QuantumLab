package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewSettingRouter(
	apiRouterGroup *gin.RouterGroup,
	db *gorm.DB,
	env *bootstrap.Env,
) {
	ur := repository.NewUserRepository(db)
	uc := controller.SettingController{
		UserUsecase: usecase.NewUserUsecase(ur),
		Env:         env,
	}

	settingRouterGroup := apiRouterGroup.Group("/settings")
	settingRouterGroup.PUT("/users", uc.UpdateUser)
}
