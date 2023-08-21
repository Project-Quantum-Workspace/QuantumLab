package usecase

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
)

type userAdminUsecase struct {
	userRepository model.UserRepository
	roleRepository model.RoleRepository
}

func NewUserAdminUsecase(
	userRepository model.UserRepository,
	roleRepository model.RoleRepository,
) model.UserAdminUsecase {
	return &userAdminUsecase{
		userRepository: userRepository,
		roleRepository: roleRepository,
	}
}

func (uau *userAdminUsecase) InviteUsers(emailList []string) error {
	users := make([]model.User, len(emailList))
	role, err := uau.roleRepository.GetByName("Researcher")
	if err != nil {
		return err
	}
	for i, email := range emailList {
		// TODO: hash passwords
		// TODO: generate ql_token
		user := model.User{
			Email:           email,
			Password:        "zxcvbn",
			AccountStatus:   true,
			AccessLevel:     1,
			QuantumlabToken: "asdfghjkl",
			Roles:           []model.Role{role},
		}
		users[i] = user
	}
	err = uau.userRepository.CreateBatch(users)
	return err
	// TODO: send emails to invited users
}

func (uau *userAdminUsecase) GetUserList() ([]model.UserListItem, error) {
	return uau.userRepository.GetAll()
}

func (uau *userAdminUsecase) GetUserDetail(id uint) (model.User, error) {
	return uau.userRepository.GetByID(id)
}

func (uau *userAdminUsecase) UpdateUser(user model.User) error {
	// TODO: hash the password
	return uau.userRepository.Update(user)
}
