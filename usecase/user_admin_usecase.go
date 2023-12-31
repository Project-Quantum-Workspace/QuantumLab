package usecase

import (
	"fmt"
	"sync"
	"time"

	"github.com/Project-Quantum-Workspace/QuantumLab/internal/emailutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/generatorutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/sliceutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
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
	port int, from string, secret string) error {
	processedEmailList, err := uau.preprocessEmailList(emailList)
	if err != nil {
		return err
	}

	role, err := uau.roleRepository.GetByName("Researcher")
	if err != nil {
		logrus.Errorf("error retrieving the role: %v", err.Error())
		return err
	}

	// send emails to invited users
	go func() {
		start := time.Now()
		users := sendUserInvitations(processedEmailList, host, port, from, secret, role)
		timeElapsed := time.Since(start)
		logrus.Infof("sendUserInvitations took %s", timeElapsed)

		if len(users) > 0 {
			err = uau.userRepository.CreateBatch(users)
			if err != nil {
				logrus.Errorf("error creating users: %v", err.Error())
			}
		}
	}()

	return nil
}

func (uau *userAdminUsecase) GetRoleIDs(userID uint) ([]uint, error) {
	return uau.userRepository.GetRoleIDs(userID)
}

func (uau *userAdminUsecase) GetUserList() ([]model.UserListItem, error) {
	return uau.userRepository.GetAll()
}

func (uau *userAdminUsecase) GetUserDetail(id uint) (*model.User, error) {
	return uau.userRepository.GetByID(id)
}

func (uau *userAdminUsecase) GetAllRoles() ([]model.Role, error) {
	return uau.roleRepository.GetAll()
}

func (uau *userAdminUsecase) SetAccountStatus(id uint, accountStatus bool) error {
	return uau.userRepository.SetAccountStatus(id, accountStatus)
}

func (uau *userAdminUsecase) UpdateUser(user *model.User) error {
	if user.Password != "" {
		// hash password
		hashedPassword, err := validationutil.GenerateHash(user.Password)
		if err != nil {
			logrus.Errorf("error hashing password: %v", err.Error())
			return err
		}
		user.Password = hashedPassword
	}
	return uau.userRepository.Update(user)
}

func (uau *userAdminUsecase) preprocessEmailList(emailList []string) ([]string, error) {
	// validate email address
	for _, email := range emailList {
		if !validationutil.ValidateEmail(email) {
			err := fmt.Errorf("invalid email address: %v", email)
			logrus.Error(err.Error())
			return nil, err
		}
	}
	// remove duplicates in the list
	processedEmailList := sliceutil.RemoveDuplicates(emailList)
	// remove registered emails from the list
	registeredEmailList, err := uau.userRepository.GetRegisteredEmails(processedEmailList)
	if err != nil {
		logrus.Errorf("error processing email list: %v", err.Error())
		return nil, err
	}
	processedEmailList = sliceutil.RemoveSubset(processedEmailList, registeredEmailList)
	return processedEmailList, nil
}

func sendUserInvitations(emailList []string,
	host string, port int, from string, secret string, role *model.Role,
) []model.User {
	// for concurrent access by goroutines
	userSlice := make([]model.User, len(emailList))
	var wg sync.WaitGroup

	for i, email := range emailList {
		password := generatorutil.GenerateRandomPassword(16, 2, 2, 2)
		// hash password
		hashedPassword, err := validationutil.GenerateHash(password)
		if err != nil {
			logrus.Errorf("error hashing password: %v", err.Error())
			continue
		}
		qlToken := generatorutil.GenerateQuantumLabToken()
		wg.Add(1)

		go func(index int, email string) {
			defer wg.Done()
			emailErr := emailutil.SendUserInvitation(email, password, host, port, from, secret)
			if emailErr == nil {
				userSlice[index] = defaultUser(email, hashedPassword, qlToken, role)
			} else {
				logrus.Errorf("error sending email: %v", emailErr.Error())
			}
		}(i, email)
	}

	wg.Wait()
	var users []model.User
	for _, user := range userSlice {
		if user.Email != "" {
			users = append(users, user)
		}
	}

	return users
}

func defaultUser(email string, password string, qlToken string, role *model.Role) model.User {
	return model.User{
		Email:           email,
		Password:        password,
		FirstName:       "Quantum",
		LastName:        "Researcher",
		AccountStatus:   true,
		AccessLevel:     1,
		QuantumlabToken: qlToken,
		Roles:           []model.Role{*role},
	}
}
