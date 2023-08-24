package usecase

import (
	"crypto/rand"
	"encoding/base64"
	"sync"

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
	port int, from string, secret string) {
	role, err := uau.roleRepository.GetByName("Researcher")
	if err != nil {
		logrus.Errorf("error retrieving the role: %v", err.Error())
		return
	}

	// send emails to invited users
	go func() {
		users, _ := sendUserInvitations(emailList, host, port, from, secret, role)
		err = uau.userRepository.CreateBatch(users)
		if err != nil {
			logrus.Errorf("error creating users: %v", err.Error())
		}
	}()
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

func generateRandomPassword(length uint) string {
	b := make([]byte, length)
	rand.Read(b)
	password := base64.StdEncoding.EncodeToString(b)
	return password
}

func sendUserInvitations(emailList []string,
	host string, port int, from string, secret string, role model.Role,
) ([]model.User, []string) {
	userArray := make([]model.User, len(emailList))
	failedEmailArray := make([]string, len(emailList))
	var wg sync.WaitGroup

	for i, email := range emailList {
		password := generateRandomPassword(16)
		wg.Add(1)

		go func(index int, email string) {
			defer wg.Done()
			err := emailutil.SendUserInvitation(email, password, host, port, from, secret)
			if err != nil {
				failedEmailArray[index] = email
			} else {
				userArray[index] = model.User{
					Email:           email,
					Password:        password,
					AccountStatus:   true,
					AccessLevel:     1,
					QuantumlabToken: "asdfghjkl",
					Roles:           []model.Role{role},
				}
			}
		}(i, email)
	}

	wg.Wait()
	var users []model.User
	var failedEmailList []string

	for _, user := range userArray {
		if user.Email != "" {
			users = append(users, user)
		}
	}

	for _, failedEmail := range failedEmailArray {
		if failedEmail != "" {
			failedEmailList = append(failedEmailList, failedEmail)
		}
	}

	return users, failedEmailList
}
