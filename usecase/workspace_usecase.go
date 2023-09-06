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

func (wu *workspaceUsecase) CreateWorkspace(workspace *model.Workspace, userID uint) error {
	return wu.workspaceRepository.Create(workspace, userID)
}

func (wu *workspaceUsecase) GetWorkspaceOwners(id uint) ([]model.User, error) {
	return wu.workspaceRepository.GetOwners(id)
}

func (wu *workspaceUsecase) CheckWorkspaceAccess(workspaceID uint, userID uint) (bool, error) {
	owners, err := wu.GetWorkspaceOwners(workspaceID)
	if err != nil {
		return false, err
	}
	for _, owner := range owners {
		if owner.ID == userID {
			return true, nil
		}
	}
	return false, nil
}

func (wu *workspaceUsecase) GetWorkspacesByUser(userID uint) ([]model.Workspace, error) {
	return wu.workspaceRepository.GetAllByUser(userID)
}

func (wu *workspaceUsecase) GetWorkspace(id uint) (*model.Workspace, error) {
	return wu.workspaceRepository.GetByID(id)
}

func (wu *workspaceUsecase) UpdateWorkspace(workspace *model.Workspace) error {
	return wu.workspaceRepository.Update(workspace)
}

func (wu *workspaceUsecase) DeleteWorkspace(id uint) error {
	return wu.workspaceRepository.Delete(id)
}
