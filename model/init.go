package model

type InitRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type NewUserInitUsecase interface {
	CreateRootAdmin(request *InitRequest) error
	GetUserCount() (int64, error)
}
