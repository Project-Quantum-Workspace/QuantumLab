package model

type LoginRequest struct {
	Email    string `form:"email" binding:"required,email"`
	Password string `form:"password" binding:"required"`
}

type LoginUsecase interface {
	FindUser(email string) (User, error)
	CreateAccessToken(user *User, roles []int, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *User, roles []int, secret string, expiry int) (refreshToken string, err error)
	GetRoleID(uid uint) ([]int, error)
}

type LoginResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	Status       string `json:"status"`
}
