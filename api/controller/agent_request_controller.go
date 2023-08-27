package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AgentRequestController struct {
	AgentRequestUsecase model.AgentRequestUsecase
	WorkspaceMonitor    map[string]string
}

// UpdateWorkspaceStatus
// @Summary Process the heartbeat message sent by a QuantumLab Agent
// @Description Update the workspace status according to the heartbeat message sent by a QuantumLab Agent.
// @Tags agent
// @Accept json
// @Produce json
// @Param request body model.AgentRequest true "agent request"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Bad Request"
// @Router /agent [post]
func (arc *AgentRequestController) UpdateWorkspaceStatus(c *gin.Context) {
	var agentRequest model.AgentRequest
	var err error

	err = c.BindJSON(&agentRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	uuid := agentRequest.WorkspaceOwner

	quantumlabToken, err := arc.AgentRequestUsecase.GetQuantumlabTokenByUUID(uuid)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	if quantumlabToken != agentRequest.QuantumlabToken {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid quantumlab token",
		})
		return
	}

	arc.WorkspaceMonitor[uuid] = agentRequest.WorkspaceStatus

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})
}
