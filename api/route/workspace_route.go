package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewWorkspaceRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	repo := repository.NewWorkspaceRepository(db)
	workspaceController := controller.WorkspaceController{
		WorkspaceUsecase: usecase.NewWorkspaceUsecase(repo),
	}
	apiRouterGroup.POST("/workspaces", workspaceController.Create)
	apiRouterGroup.GET("/workspaces/users/:id", workspaceController.GetAllByUser)
	apiRouterGroup.GET("/workspaces/:id", workspaceController.GetByID)
	apiRouterGroup.PATCH("/workspaces/:id", workspaceController.Update)
	apiRouterGroup.DELETE("/workspaces/:id", workspaceController.Delete)
}
