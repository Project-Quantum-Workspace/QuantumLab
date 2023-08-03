package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewWorkspaceRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	workspaceRouterGroup := apiRouterGroup.Group("/workspace")
	repo := repository.NewWorkspaceRepository(db)
	workspaceController := controller.WorkspaceController{
		WorkspaceUsecase: usecase.NewWorkspaceUsecase(repo),
	}
	workspaceRouterGroup.POST("/create", workspaceController.Create)
	workspaceRouterGroup.GET("/:id", workspaceController.GetByID)
	workspaceRouterGroup.POST("/update", workspaceController.Update)
	workspaceRouterGroup.POST("/delete/:id", workspaceController.Delete)
}
