package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"gorm.io/gorm"
)

type userRepository struct {
	database *gorm.DB
}

func NewUserRepository(db *gorm.DB) model.UserRepository {
	return &userRepository{
		database: db,
	}
}

func (ur *userRepository) Create(user *model.User) error {
	result := ur.database.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (ur *userRepository) GetByEmail(email string) (model.User, error) {
	var user model.User
	result := ur.database.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}

func (ur *userRepository) GetRoleID(uid uint) ([]int, error) {
	var RID []int
	result := ur.database.Raw(`SELECT role_id FROM user_roles WHERE user_roles.user_id = ?`, uid).Scan(&RID)
	if result.Error != nil {
		return RID, result.Error
	}
	return RID, result.Error
}
