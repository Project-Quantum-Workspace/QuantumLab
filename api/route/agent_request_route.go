package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewAgentRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup, workspaceMonitor map[string]string) {
	repo := repository.NewUserRepository(db)
	agentRequestController := &controller.AgentRequestController{
		AgentRequestUsecase: usecase.NewAgentRequestUseCase(repo),
		WorkspaceMonitor:    workspaceMonitor,
	}

	apiRouterGroup.POST("/agent", agentRequestController.UpdateWorkspaceStatus)
}
