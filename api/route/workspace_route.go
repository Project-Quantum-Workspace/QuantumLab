package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewWorkspaceRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	wr := repository.NewWorkspaceRepository(db)
	wc := controller.WorkspaceController{
		WorkspaceUsecase: usecase.NewWorkspaceUsecase(wr),
	}
	apiRouterGroup.POST("/workspaces", wc.Create)
	apiRouterGroup.GET("/workspaces/users/:id", wc.GetAllByUser)
	apiRouterGroup.GET("/workspaces/:id", wc.GetByID)
	apiRouterGroup.PATCH("/workspaces/:id", wc.Update)
	apiRouterGroup.DELETE("/workspaces/:id", wc.Delete)
}
