package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewSignupRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	repo := repository.NewUserRepository(db)
	controller := controller.SignupController{
		SignupUsecase: usecase.NewSignupUsecase(repo),
	}
	apiRouterGroup.POST("/signup", controller.Signup)
}
