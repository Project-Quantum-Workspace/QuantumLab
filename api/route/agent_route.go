package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewAgentRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup, workspaceMonitor map[string]string) {
	repo := repository.NewAgentRequestRepository(db, workspaceMonitor)
	agentRequestController := &controller.AgentRequestController{
		AgentRequestUsecase: usecase.NewAgentRequestUseCase(repo),
	}

	apiRouterGroup.POST("/agent", agentRequestController.UpdateWorkspaceStatus)
}
