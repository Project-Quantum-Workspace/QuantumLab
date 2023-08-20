package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type userAdminUsecase struct {
	userRepository model.UserRepository
}

func NewUserAdminUsecase(userRepository model.UserRepository) model.UserAdminUsecase {
	return &userAdminUsecase{
		userRepository: userRepository,
	}
}

func (uau *userAdminUsecase) GetUserList() ([]model.UserListItem, error) {
	return uau.userRepository.GetAll()
}

func (uau *userAdminUsecase) GetUserDetail(id uint) (model.User, error) {
	return uau.userRepository.GetByID(id)
}

func (uau *userAdminUsecase) Update(user model.User) error {
	// TODO: hash the password
	return uau.userRepository.Update(user)
}
