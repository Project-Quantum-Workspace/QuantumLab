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
	err := repo.qlDB.Transaction(func(tx *gorm.DB) error {
		// Omit `ID` to avoid error triggered by frontend developers adding id field in requests
		// Omit `Template` to forbid auto create of Templates
		result := tx.Omit("ID", "UUID", "Template").Create(workspace)
		if result.Error != nil {
			return result.Error
		}
		result = tx.Create(&model.UserWorkspace{
			UserID:      userID,
			WorkspaceID: workspace.ID,
		})
		return result.Error
	})
	return err
}

func (repo *workspaceRepository) GetAllByUser(userID uint) ([]model.Workspace, error) {
	var workspaces []model.Workspace
	association := repo.qlDB.Joins("Template").
		Model(&model.User{ID: userID}).Association("Workspaces")
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
	result := repo.qlDB.Model(&workspace).
		Omit("ID", "UUID", "Template").Updates(*workspace)
	return result.Error
}

func (repo *workspaceRepository) Delete(id uint) error {
	result := repo.qlDB.Delete(&model.Workspace{}, id)
	return result.Error
}
