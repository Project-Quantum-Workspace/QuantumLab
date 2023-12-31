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

func (wr *workspaceRepository) Create(workspace *model.Workspace, userID uint) error {
	err := wr.qlDB.Transaction(func(tx *gorm.DB) error {
		// Omit `ID` to avoid error triggered by frontend developers adding id field in requests
		// Omit `Template` to forbid auto create of Templates
		result := tx.Omit("ID", "UUID", "Template", "Users").Create(workspace)
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

func (wr *workspaceRepository) GetOwnerIDs(id uint) ([]uint, error) {
	var userIDs []uint
	err := wr.qlDB.Select("id").
		Model(&model.Workspace{ID: id}).Association("Users").Find(&userIDs)
	if userIDs == nil {
		userIDs = []uint{}
	}
	return userIDs, err
}

func (wr *workspaceRepository) GetAllByUser(userID uint) ([]model.Workspace, error) {
	var workspaces []model.Workspace
	err := wr.qlDB.Joins("Template").
		Model(&model.User{ID: userID}).Association("Workspaces").Find(&workspaces)
	// return an empty array instead of nil if no rows are found
	if workspaces == nil {
		workspaces = []model.Workspace{}
	}
	return workspaces, err
}

func (wr *workspaceRepository) GetByID(id uint) (*model.Workspace, error) {
	var workspace model.Workspace
	result := wr.qlDB.Joins("Template").First(&workspace, id)
	return &workspace, result.Error
}

func (wr *workspaceRepository) Update(workspace *model.Workspace) error {
	result := wr.qlDB.Model(workspace).
		Omit("ID", "UUID", "Template", "Users").Updates(*workspace)
	return result.Error
}

func (wr *workspaceRepository) Delete(id uint) error {
	result := wr.qlDB.Delete(&model.Workspace{}, id)
	return result.Error
}

func (wr *workspaceRepository) GetWorkspaceToolset(id uint) ([]model.Toolset, error) {
	var toolsets []model.Toolset
	result := wr.qlDB.Raw(`SELECT * FROM toolsets WHERE toolsets.workspace_id = ?`, id).Scan(&toolsets)
	if result.Error != nil {
		return toolsets, result.Error
	}
	return toolsets, result.Error
}
