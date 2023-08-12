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

func (repo *workspaceRepository) Create(workspace *model.Workspace) error {
	// Omit `ID` to avoid error triggered by frontend developers adding id field in requests
	// Omit `Template` to forbid auto create of Templates
	// skip the insertion of new user but include the insertion of the association
	result := repo.qlDB.Omit("ID", "Template", "Users.*").Create(workspace)
	return result.Error
}

func (repo *workspaceRepository) GetAllByUser(userID uint) ([]model.Workspace, error) {
	var workspaces []model.Workspace
	user := model.User{ID: userID}
	association := repo.qlDB.Joins("Template").
		Model(&user).Association("Workspaces")

	if association.Error != nil {
		return workspaces, association.Error
	}
	err := association.Find(&workspaces)
	return workspaces, err
}

func (repo *workspaceRepository) GetByID(id uint) (model.Workspace, error) {
	var workspace model.Workspace
	result := repo.qlDB.Joins("Template").First(&workspace, id)
	return workspace, result.Error
}

func (repo *workspaceRepository) Update(workspace *model.Workspace) error {
	// Omit `Users.*` allows insertions of new user_workspaces associations
	// for possible shared workspace extension
	result := repo.qlDB.Model(workspace).
		Omit("ID", "Template", "Users.*").Updates(*workspace)
	return result.Error
}

func (repo *workspaceRepository) Delete(id uint) error {
	result := repo.qlDB.Delete(&model.Workspace{}, id)
	return result.Error
}
