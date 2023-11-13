package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewResultRouter(apiRouterGroup *gin.RouterGroup, rdb *gorm.DB, db *gorm.DB) {
	repo := repository.NewResultRepository(rdb, db)
	resultController := controller.ResultController{
		ResultUsecase: usecase.NewResultUsecase(repo),
	}
	apiRouterGroup.POST("/results", resultController.Create)
}
