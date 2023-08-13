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

func (usecase *workspaceUsecase) Create(workspace *model.Workspace, userUUID string) error {
	return usecase.workspaceRepository.Create(workspace, userUUID)
}

func (usecase *workspaceUsecase) GetAllByUser(userUUID string) ([]model.Workspace, error) {
	return usecase.workspaceRepository.GetAllByUser(userUUID)
}

func (usecase *workspaceUsecase) GetByUUID(uuid string) (model.Workspace, error) {
	return usecase.workspaceRepository.GetByUUID(uuid)
}

func (usecase *workspaceUsecase) Update(workspace *model.Workspace, uuid string) error {
	return usecase.workspaceRepository.Update(workspace, uuid)
}

func (usecase *workspaceUsecase) Delete(uuid string) error {
	return usecase.workspaceRepository.Delete(uuid)
}
