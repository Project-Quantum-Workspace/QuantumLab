package usecase

import (
	"errors"

	"github.com/Project-Quantum-Workspace/QuantumLab/internal/generatorutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/sirupsen/logrus"
)

type userInitUsecase struct {
	userRepository model.UserRepository
	roleRepository model.RoleRepository
}

func NewUserInitUsecase(
	userRepository model.UserRepository,
	roleRepository model.RoleRepository,
) model.NewUserInitUsecase {
	return &userInitUsecase{
		userRepository: userRepository,
		roleRepository: roleRepository,
	}
}

func (uiu *userInitUsecase) CreateRootAdmin(request *model.InitRequest) error {
	count, countError := uiu.userRepository.GetCount()
	if countError != nil {
		logrus.Errorf("error counting number of users: %v", countError.Error())
		return countError
	}
	if count != 0 {
		return errors.New("already has users")
	}

	roleInitError := uiu.roleRepository.InitRoles()
	if roleInitError != nil {
		logrus.Errorf("error initiating roles: %v", roleInitError.Error())
		return roleInitError
	}

	// Root Administrator has id = 0
	roleID := uint(0)
	role := model.Role{ID: &roleID}

	hashedPassword, err := validationutil.GenerateHash(request.Password)
	if err != nil {
		logrus.Errorf("error hashing password: %v", err.Error())
		return err
	}
	user := &model.User{Email: request.Email, Password: hashedPassword}
	user.AccessLevel = 10
	user.AccountStatus = true
	user.QuantumlabToken = generatorutil.GenerateQuantumLabToken()
	user.Roles = []model.Role{role}
	user.FirstName = "Root"
	user.LastName = "Administrator"

	err = uiu.userRepository.Create(user)
	if err != nil {
		logrus.Errorf("error creating root admin: %v", err.Error())
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
