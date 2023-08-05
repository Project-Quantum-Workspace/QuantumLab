package model

type User struct {
	ID              uint        `json:"id"`
	Email           string      `json:"email"`
	Password        string      `json:"password"`
	AccessLevel     uint        `json:"access_level"`
	QuantumlabToken string      `json:"quantumlab_token"`
	Workspaces      []Workspace `json:"workspaces" gorm:"many2many:user_workspaces;"`
}

type UserRepository interface {
	Create(user *User) error
	GetByEmail(email string) (User, error)
}
