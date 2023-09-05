package usecase

import (
	"errors"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/sirupsen/logrus"
)

type userInitUsecase struct {
	userRepository model.UserRepository
}

func NewUserInitUsecase(
	userRepository model.UserRepository,
) model.NewUserInitUsecase {
	return &userInitUsecase{
		userRepository: userRepository,
	}
}

func (uiu *userInitUsecase) CreateFirstUser(user model.User) error {
	count, countError := uiu.userRepository.GetCount()
	if countError != nil {
		logrus.Errorf("error counting number of users: %v", countError.Error())
		return countError
	}
	if count != 0 {
		logrus.Infof("error counting number of users")
		return errors.New("already has users")
	}
	err := uiu.userRepository.CreateFirstUser(user)
	if err != nil {
		logrus.Errorf("error creating the first user: %v", err.Error())
		return err
	}
	return nil
}

func (uiu *userInitUsecase) GetUserCount() (int64, error) {
	count, countError := uiu.userRepository.GetCount()
	if countError != nil {
		logrus.Errorf("%v", countError.Error())
		return 0, countError
	}
	return count, countError
}
