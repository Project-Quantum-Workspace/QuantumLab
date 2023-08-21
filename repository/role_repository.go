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

func (rr *roleRepository) GetByName(name string) (model.Role, error) {
	var role model.Role
	result := rr.qlDB.Where("name = ?", name).First(&role)
	return role, result.Error
}
