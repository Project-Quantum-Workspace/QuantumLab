package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"gorm.io/gorm"
)

type workspaceRepository struct {
	qlDB *gorm.DB
}

func NewWorkspaceRepository(qlDB *gorm.DB) model.WorkspaceRepository {
	return &workspaceRepository{
		qlDB: qlDB,
	}
}

func (repo *workspaceRepository) Create(workspace *model.Workspace, userID uint) error {
	result := repo.qlDB.Create(workspace)
	if result.Error != nil {
		return result.Error
	}
	result = repo.qlDB.Create(&model.UserWorkspaces{
		UserID:      userID,
		WorkspaceID: workspace.ID,
	})
	return result.Error
}

func (repo *workspaceRepository) GetAllByUser(userID uint) ([]model.Workspace, error) {
	var workspaces []model.Workspace
	result := repo.qlDB.
		Raw(`
			SELECT w.*
			FROM workspaces w
			INNER JOIN user_workspaces uw ON w.id = uw.workspace_id
			WHERE uw.user_id = ?
		`, userID).
		Scan(&workspaces)
	return workspaces, result.Error
}

func (repo *workspaceRepository) GetByID(id uint) (model.Workspace, error) {
	var workspace model.Workspace
	result := repo.qlDB.First(&workspace, id)
	return workspace, result.Error
}

func (repo *workspaceRepository) Update(workspace *model.Workspace) error {
	result := repo.qlDB.Model(workspace).
		Omit("ID").Updates(*workspace)
	return result.Error
}

func (repo *workspaceRepository) Delete(id uint) error {
	result := repo.qlDB.Delete(&model.Workspace{}, id)
	return result.Error
}
