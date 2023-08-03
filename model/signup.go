package model

type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupUsecase interface {
	Create(user *User) error
}
