package usecase

import (
	"QuantumLab/model"
)

type signupUsecase struct {
	userRepository model.UserRepository
}

func NewSignupUsecase(userRepository model.UserRepository) model.SignupUsecase {
	return &signupUsecase{
		userRepository: userRepository,
	}
}

func (usecase *signupUsecase) Create(user *model.User) error {
	return usecase.userRepository.Create(user)
}
