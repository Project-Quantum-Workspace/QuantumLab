package repository

import (
	"errors"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
)

type agentRequestRepository struct {
	db               *gorm.DB
	workspaceMonitor map[string]string
}

func NewAgentRequestRepository(db *gorm.DB, workspaceMonitor map[string]string) model.AgentRequestRepository {
	return &agentRequestRepository{
		db:               db,
		workspaceMonitor: workspaceMonitor,
	}
}

func (repo *agentRequestRepository) ValidateAgentRequest(agentRequest *model.AgentRequest) error {
	var users []model.User
	result := repo.db.Select("quantumlab_token").Where("uuid = ?", agentRequest.WorkspaceOwner).Find(&users)
	if result.Error != nil {
		return result.Error
	}
	if len(users) == 0 {
		return errors.New("invalid workspace owner")
	}
	if users[0].QuantumlabToken != agentRequest.QuantumlabToken {
		return errors.New("invalid QuantumLab token")
	}
	repo.workspaceMonitor[agentRequest.WorkspaceID] = agentRequest.WorkspaceStatus
	return nil
}
