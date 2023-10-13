package repository

import (
	"errors"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/sirupsen/logrus"

	"gorm.io/gorm"
)

type userRepository struct {
	qlDB *gorm.DB
}

func NewUserRepository(db *gorm.DB) model.UserRepository {
	return &userRepository{
		qlDB: db,
	}
}

func (ur *userRepository) Create(users *model.User) error {
	result := ur.qlDB.
		Omit("ID", "UUID", "Workspaces", "Roles.*").
		Create(users)
	return result.Error
}

func (ur *userRepository) CreateBatch(users []model.User) error {
	result := ur.qlDB.
		Omit("ID", "UUID", "Workspaces", "Roles.*").
		Create(&users)
	return result.Error
}

func (ur *userRepository) GetByEmail(email string) (*model.User, error) {
	var user model.User
	result := ur.qlDB.Preload("Roles").Where("email = ?", email).First(&user)
	return &user, result.Error
}

func (ur *userRepository) GetQuantumlabTokenByUUID(uuid string) (string, error) {
	var users []model.User
	result := ur.qlDB.Select("quantumlab_token").Where("uuid = ?", uuid).Find(&users)
	if result.Error != nil {
		return "", result.Error
	}
	if len(users) == 0 {
		return "", errors.New("invalid workspace owner")
	}
	return users[0].QuantumlabToken, nil
}

func (ur *userRepository) GetRoleIDs(uid uint) ([]uint, error) {
	var RID []uint
	result := ur.qlDB.Raw(`SELECT role_id FROM user_roles WHERE user_roles.user_id = ?`, uid).Scan(&RID)
	if result.Error != nil {
		return RID, result.Error
	}
	return RID, result.Error
}

func (ur *userRepository) GetRegisteredEmails(emailList []string) ([]string, error) {
	var registeredEmailList []string
	result := ur.qlDB.Model(&model.User{}).
		Select("email").Where("email IN ?", emailList).Find(&registeredEmailList)
	return registeredEmailList, result.Error
}

func (ur *userRepository) GetByID(id uint) (*model.User, error) {
	var user model.User
	result := ur.qlDB.Omit("password").Preload("Roles").First(&user, id)
	return &user, result.Error
}

func (ur *userRepository) GetAll() ([]model.UserListItem, error) {
	var users []model.UserListItem
	result := ur.qlDB.Model(&model.User{}).Preload("Roles").Find(&users)
	return users, result.Error
}

func (ur *userRepository) Update(user *model.User) error {
	err := ur.qlDB.Transaction(func(tx *gorm.DB) error {
		var result *gorm.DB
		omit := []string{"ID", "UUID", "Workspaces", "Roles"}
		if user.Password == "" {
			omit = append(omit, "Password")
			// add Select("*") to include non-zero field
			// gorm sucks!!
			result = ur.qlDB.Model(user).Select("*").
				Omit(omit...).Updates(user)
		} else {
			result = ur.qlDB.Model(user).Select("*").
				Omit(omit...).Updates(user)
		}
		if result.Error != nil {
			return result.Error
		}
		if user.Roles != nil {
			err := ur.qlDB.Model(user).Omit("Roles.*").
				Association("Roles").Replace(user.Roles)
			return err
		}
		return nil
	})
	return err
}

func (ur *userRepository) UpdateSelf(user *model.User) error {
	omit := []string{"ID", "UUID", "Workspaces", "Roles", "QuantumlabToken", "AccountStatus"}
	result := ur.qlDB.Model(user).Omit(omit...).Updates(user)
	return result.Error
}

func (ur *userRepository) SetAccountStatus(id uint, accountStatus bool) error {
	result := ur.qlDB.Model(&model.User{ID: id}).
		Update("account_status", accountStatus)
	return result.Error
}

func (ur *userRepository) GetCount() (int64, error) {
	var count int64
	query := "SELECT COUNT(*) FROM users"
	err := ur.qlDB.Raw(query).Scan(&count)
	if err.Error != nil {
		logrus.Errorf("error counting users: %v", err.Error)
		return -1, err.Error
	}
	return count, err.Error
}
