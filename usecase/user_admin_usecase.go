package usecase

import (
	"crypto/rand"
	"encoding/base64"

	"github.com/Project-Quantum-Workspace/QuantumLab/internal/emailutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/sirupsen/logrus"
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

func (uau *userAdminUsecase) InviteUsers(
	emailList []string, host string,
	port uint, from string, secret string,
) error {
	users := make([]model.User, len(emailList))
	role, err := uau.roleRepository.GetByName("Researcher")
	if err != nil {
		return err
	}

	for i, email := range emailList {
		// TODO: hash passwords
		// TODO: generate ql_token
		password, err := generateRandomPassword(16)
		if err != nil {
			logrus.Errorf("error generating password: %v", err.Error())
			return err
		}
		user := model.User{
			Email:           email,
			Password:        password,
			AccountStatus:   true,
			AccessLevel:     1,
			QuantumlabToken: "asdfghjkl",
			Roles:           []model.Role{role},
		}
		users[i] = user
	}

	err = uau.userRepository.CreateBatch(users)
	if err != nil {
		return err
	}

	// send emails to invited users
	emailutil.SendInvitation(users, host, port, from, secret)
	return nil
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

func generateRandomPassword(length uint) (string, error) {
	b := make([]byte, length)
	_, err := rand.Read(b)
	password := base64.StdEncoding.EncodeToString(b)
	return password, err
}
