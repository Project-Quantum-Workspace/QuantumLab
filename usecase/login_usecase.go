package usecase

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
)

type loginUsecase struct {
	userRepository model.UserRepository
}

func NewLoginUC(userRepository model.UserRepository) model.LoginUsecase {
	return &loginUsecase{
		userRepository: userRepository,
	}
}

func (lu *loginUsecase) FindUser(email string) (model.User, error) {
	return lu.userRepository.GetByEmail(email)
}

func (lu *loginUsecase) CreateAccessToken(user *model.User, secret string, expiry int) (accessToken string, err error) {
	return tokenutil.CreateAccessToken(user, secret, expiry)
}

func (lu *loginUsecase) CreateRefreshToken(user *model.User, secret string, expiry int) (refreshToken string, err error) {
	return tokenutil.CreateRefreshToken(user, secret, expiry)
}
