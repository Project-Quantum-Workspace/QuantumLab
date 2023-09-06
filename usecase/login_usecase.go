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

func (lu *loginUsecase) GetRoleIDs(uid uint) ([]uint, error) {
	return lu.userRepository.GetRoleIDs(uid)
}

func (lu *loginUsecase) CreateAccessToken(user *model.User, roles []uint, secret string, expiry int) (accessToken string, err error) {
	return tokenutil.CreateAccessToken(user, roles, secret, expiry)
}

func (lu *loginUsecase) CreateRefreshToken(user *model.User, roles []uint, secret string, expiry int) (refreshToken string, err error) {
	return tokenutil.CreateRefreshToken(user, roles, secret, expiry)
}
