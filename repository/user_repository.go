package repository

import (
	"QuantumLab/model"

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
