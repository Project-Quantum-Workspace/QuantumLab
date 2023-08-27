package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type agentRequestUsecase struct {
	userRepository model.UserRepository
}

func NewAgentRequestUseCase(userRepository model.UserRepository) model.AgentRequestUsecase {
	return &agentRequestUsecase{
		userRepository: userRepository,
	}
}

func (usecase *agentRequestUsecase) GetQuantumlabTokenByUUID(uuid string) (string, error) {
	return usecase.userRepository.GetQuantumlabTokenByUUID(uuid)
}
