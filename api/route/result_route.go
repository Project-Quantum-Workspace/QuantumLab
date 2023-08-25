package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewResultRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	repo := repository.NewResultRepository(db)
	resultController := controller.ResultController{
		ResultUsecase: usecase.NewResultUsecase(repo),
	}
	apiRouterGroup.POST("/results", resultController.Create)
}
