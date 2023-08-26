package usecase

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
)

type resultUsecase struct {
	resultRepository model.ResultRepository
}

func NewResultUsecase(resultRepository model.ResultRepository) model.ResultUsecase {
	return &resultUsecase{
		resultRepository: resultRepository,
	}
}

func (result *resultUsecase) Create(table *model.CreateTableRequest) error {
	validation := validationutil.ValidateTableCreationRequest(table)
	if validation != nil {
		return validation
	}
	return result.resultRepository.Create(table)
}
