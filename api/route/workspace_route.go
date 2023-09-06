package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewWorkspaceRouter(
	apiRouterGroup *gin.RouterGroup,
	db *gorm.DB,
	env *bootstrap.Env,
) {
	wr := repository.NewWorkspaceRepository(db)
	wc := controller.WorkspaceController{
		WorkspaceUsecase: usecase.NewWorkspaceUsecase(wr),
		Env:              env,
	}
	apiRouterGroup.POST("/workspaces", wc.CreateWorkspace)
	apiRouterGroup.GET("/workspaces/users/:id", wc.GetWorkspacesByUser)
	apiRouterGroup.GET("/workspaces/:id", wc.GetWorkspace)
	apiRouterGroup.PATCH("/workspaces/:id", wc.UpdateWorkspace)
	apiRouterGroup.DELETE("/workspaces/:id", wc.DeleteWorkspace)
}
