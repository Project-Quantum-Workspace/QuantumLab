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

func (wu *workspaceUsecase) Create(workspace *model.Workspace, userID uint) error {
	return wu.workspaceRepository.Create(workspace, userID)
}

func (wu *workspaceUsecase) GetAllByUser(userID uint) ([]model.Workspace, error) {
	return wu.workspaceRepository.GetAllByUser(userID)
}

func (wu *workspaceUsecase) GetByID(id uint) (model.Workspace, error) {
	return wu.workspaceRepository.GetByID(id)
}

func (wu *workspaceUsecase) Update(workspace *model.Workspace) error {
	return wu.workspaceRepository.Update(workspace)
}

func (wu *workspaceUsecase) Delete(id uint) error {
	return wu.workspaceRepository.Delete(id)
}
