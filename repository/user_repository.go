package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"gorm.io/gorm"
)

type userRepository struct {
	qlDB *gorm.DB
}

func NewUserRepository(db *gorm.DB) model.UserRepository {
	return &userRepository{
		qlDB: db,
	}
}

func (ur *userRepository) Create(user *model.User) error {
	result := ur.qlDB.Create(&user)
	return result.Error
}

func (ur *userRepository) GetByEmail(email string) (model.User, error) {
	var user model.User
	result := ur.qlDB.Where("email = ?", email).First(&user)
	return user, result.Error
}

func (ur *userRepository) GetByID(id uint) (model.User, error) {
	var user model.User
	result := ur.qlDB.Omit("password").Preload("Roles").First(&user, id)
	return user, result.Error
}

func (ur *userRepository) GetAll() ([]model.UserListItem, error) {
	var users []model.UserListItem
	result := ur.qlDB.Model(&model.User{}).Preload("Roles").Find(&users)
	return users, result.Error
}
