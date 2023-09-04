package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewFileRouter(env *bootstrap.Env, db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	repo := repository.NewFileRepository(db)

	fileController := controller.FileController{
		FileUsecase: usecase.NewFileUsecase(repo),
		Env:         env,
	}

	apiRouterGroup.POST("/files", fileController.CreateFile)
	apiRouterGroup.GET("/files/:id", fileController.GetFileByID)
}
