package model

type User struct {
	ID              uint        `json:"id"`
	Email           string      `json:"email"`
	Password        string      `json:"password"`
	AccessLevel     uint        `json:"accessLevel"`
	QuantumlabToken string      `json:"quantumlabToken"`
	Workspaces      []Workspace `json:"workspaces" gorm:"many2many:user_workspaces;"`
}

type UserRepository interface {
	Create(user *User) error
	GetByEmail(email string) (User, error)
	GetQuantumlabTokenByUUID(uuid string) (string, error)
	GetRoleID(uid uint) ([]int, error)
}
