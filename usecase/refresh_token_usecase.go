package usecase

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
)

type refreshTokenUsecase struct {
	userRepository model.UserRepository
}

func NewRefreshTokenUsecase(userRepository model.UserRepository) model.RefreshTokenUsecase {
	return &refreshTokenUsecase{
		userRepository: userRepository,
	}
}

func (rtu *refreshTokenUsecase) FindUser(email string) (*model.User, error) {
	return rtu.userRepository.GetByEmail(email)
}

func (rtu *refreshTokenUsecase) CreateAccessToken(
	user *model.User, secret string, expiry int) (accessToken string, err error) {
	return tokenutil.CreateAccessToken(user, secret, expiry)
}

func (rtu *refreshTokenUsecase) CreateRefreshToken(
	user *model.User, secret string, expiry int) (refreshToken string, err error) {
	return tokenutil.CreateRefreshToken(user, secret, expiry)
}

func (rtu *refreshTokenUsecase) ExtractClaimsFromToken(requestToken string, secret string) (*model.JwtCustomClaims, error) {
	return tokenutil.ExtractClaimsFromToken(requestToken, secret)
}
