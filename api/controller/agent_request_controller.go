package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AgentRequestController struct {
	AgentRequestUsecase model.AgentRequestUsecase
}

func (arc *AgentRequestController) UpdateWorkspaceStatus(c *gin.Context) {
	var agentRequest model.AgentRequest

	err := c.BindJSON(&agentRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	err = arc.AgentRequestUsecase.ValidateAgentRequest(&agentRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})
}
