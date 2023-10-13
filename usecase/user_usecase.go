package usecase

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/sirupsen/logrus"
)

type userUsecase struct {
	userRepository model.UserRepository
}

func NewUserUsecase(userRepository model.UserRepository) model.UserUsecase {
	return &userUsecase{
		userRepository: userRepository,
	}
}

func (uu *userUsecase) UpdateUser(user *model.User) error {
	if user.Password != "" {
		// hash password
		hashedPassword, err := validationutil.GenerateHash(user.Password)
		if err != nil {
			logrus.Errorf("error hashing password: %v", err.Error())
			return err
		}
		user.Password = hashedPassword
	}
	return uu.userRepository.UpdateSelf(user)
}
