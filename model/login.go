package model

type LoginRequest struct {
	Email    string `form:"email" binding:"required,email"`
	Password string `form:"password" binding:"required"`
}

type LoginUsecase interface {
	FindUser(email string) (User, error)
	CreateAccessToken(user *User, roles []uint, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *User, roles []uint, secret string, expiry int) (refreshToken string, err error)
	GetRoleIDs(uid uint) ([]uint, error)
}

type LoginResponse struct {
	Status string `json:"status"`
}
