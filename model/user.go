package model

type User struct {
	ID              uint   `json:"id"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	AccessLevel     uint   `json:"access_level"`
	QuantumlabToken string `json:"quantumlab_token"`
}

type UserRepository interface {
	Create(user *User) error
	GetByEmail(email string) (User, error)
}
