package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type agentRequestUsecase struct {
	agentRequestRepository model.AgentRequestRepository
}

func NewAgentRequestUseCase(agentRequestRepository model.AgentRequestRepository) model.AgentRequestUsecase {
	return &agentRequestUsecase{
		agentRequestRepository: agentRequestRepository,
	}
}

func (usecase *agentRequestUsecase) ValidateAgentRequest(agentRequest *model.AgentRequest) error {
	return usecase.agentRequestRepository.ValidateAgentRequest(agentRequest)
}
