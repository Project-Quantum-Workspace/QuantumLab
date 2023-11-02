package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type jobMonitorUsecase struct {
	jobMonitorRepository model.JobMonitorRepository
}

func NewJobMonitorUsecase(jobMonitorRepository model.JobMonitorRepository) model.JobMonitorUsecase {
	return &jobMonitorUsecase{
		jobMonitorRepository: jobMonitorRepository,
	}
}

func (jmu *jobMonitorUsecase) GetUserIBMToken(userID uint) (model.Token, error) {
	return jmu.jobMonitorRepository.GetUserIBMToken(userID)
}
