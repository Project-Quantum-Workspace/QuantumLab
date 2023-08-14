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

func (repo *workspaceRepository) Create(workspace *model.Workspace, userUUID string) error {
	err := repo.qlDB.Transaction(func(tx *gorm.DB) error {
		// Omit `ID` to avoid error triggered by frontend developers adding id field in requests
		// Omit `Template` to forbid auto create of Templates
		result := tx.Omit("ID", "UUID", "Template").Create(workspace)
		if result.Error != nil {
			return result.Error
		}
		var user model.User
		result = tx.Select("id").Where("uuid = ?", userUUID).First(&user)
		if result.Error != nil {
			return result.Error
		}
		result = tx.Create(&model.UserWorkspace{
			UserID:      user.ID,
			WorkspaceID: workspace.ID,
		})
		return result.Error
	})
	return err
}

func (repo *workspaceRepository) GetAllByUser(userUUID string) ([]model.Workspace, error) {
	// gorm sucks!!
	var workspaces []model.Workspace
	result := repo.qlDB.Raw(`
		SELECT workspaces.*,
		templates.id AS "Template__id",
		templates.parameters AS "Template__parameters",
		templates.access_level AS "Template__access_level",
		templates.filename AS "Template__filename",
		templates.icon AS "Template__icon"
		FROM workspaces
		INNER JOIN user_workspaces ON workspaces.id = user_workspaces.workspace_id
		INNER JOIN users ON users.id = user_workspaces.user_id
		LEFT JOIN templates ON workspaces.template_id = templates.id
		WHERE users.uuid = ?
	`, userUUID).Scan(&workspaces)
	return workspaces, result.Error
}

func (repo *workspaceRepository) GetByUUID(uuid string) (model.Workspace, error) {
	var workspace model.Workspace
	result := repo.qlDB.Joins("Template").First(&workspace, "uuid = ?", uuid)
	return workspace, result.Error
}

func (repo *workspaceRepository) Update(workspace *model.Workspace, uuid string) error {
	result := repo.qlDB.Model(&model.Workspace{}).Omit("ID", "UUID", "Template").
		Where("uuid = ?", uuid).Updates(*workspace)
	return result.Error
}

func (repo *workspaceRepository) Delete(uuid string) error {
	result := repo.qlDB.Where("uuid = ?", uuid).Delete(&model.Workspace{})
	return result.Error
}
