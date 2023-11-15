package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
)

type roleRepository struct {
	qlDB *gorm.DB
}

func NewRoleRepository(db *gorm.DB) model.RoleRepository {
	return &roleRepository{
		qlDB: db,
	}
}

func (rr *roleRepository) GetAll() ([]model.Role, error) {
	var roles []model.Role
	result := rr.qlDB.Order("id").Find(&roles)
	if roles == nil {
		roles = []model.Role{}
	}
	return roles, result.Error
}

func (rr *roleRepository) GetByName(name string) (*model.Role, error) {
	var role model.Role
	result := rr.qlDB.Where("name = ?", name).First(&role)
	return &role, result.Error
}

func (rr *roleRepository) InitRoles() error {
	var roles []model.Role
	roles = append(roles, model.Role{ID: new(uint), Name: "Root Administrator"})
	*roles[0].ID = 0
	roles = append(roles, model.Role{ID: new(uint), Name: "Administrator"})
	*roles[1].ID = 1
	roles = append(roles, model.Role{ID: new(uint), Name: "Researcher"})
	*roles[2].ID = 2

	err := rr.qlDB.Transaction(func(tx *gorm.DB) error {
		for _, role := range roles {
			if err := tx.Create(&role).Error; err != nil {
				return err
			}
		}
		return nil
	})
	return err
}
