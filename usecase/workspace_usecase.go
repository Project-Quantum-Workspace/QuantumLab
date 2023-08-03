package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type workspaceUsecase struct {
	workspaceRepository model.WorkspaceRepository
}

func NewWorkspaceUsecase(workspaceRepository model.WorkspaceRepository) model.WorkspaceUsecase {
	return &workspaceUsecase{
		workspaceRepository: workspaceRepository,
	}
}

func (usecase *workspaceUsecase) Create(workspace *model.Workspace, userID uint) error {
	return usecase.workspaceRepository.Create(workspace, userID)
}

func (usecase *workspaceUsecase) GetByID(id uint) (model.Workspace, error) {
	return usecase.workspaceRepository.GetByID(id)
}

func (usecase *workspaceUsecase) Update(workspace *model.Workspace) error {
	return usecase.workspaceRepository.Update(workspace)
}

func (usecase *workspaceUsecase) Delete(id uint) error {
	return usecase.workspaceRepository.Delete(id)
}
