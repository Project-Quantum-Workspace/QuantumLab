package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type userTokenUsecase struct {
	userTokenRepository model.UserTokenRepository
}

func NewUserTokenUsecase(userTokenRepository model.UserTokenRepository) model.UserTokenUsecase {
	return &userTokenUsecase{
		userTokenRepository: userTokenRepository,
	}
}

func (utu *userTokenUsecase) GetUserTokens(userID uint) ([]model.Token, error) {
	return utu.userTokenRepository.GetUserTokens(userID)
}

func (utu *userTokenUsecase) AddToken(request model.TokenRequest, userID uint) error {
	token := model.Token{ID: 0, UserID: userID, Name: request.Name, Value: request.Value}
	return utu.userTokenRepository.AddToken(token)
}

func (utu *userTokenUsecase) CheckRequest(name string, uid uint) []model.Token {
	return utu.userTokenRepository.CheckRequest(name, uid)
}

func (utu *userTokenUsecase) EditToken(request model.TokenRequest, uid uint) error {
	return utu.userTokenRepository.EditToken(request, uid)
}

func (utu *userTokenUsecase) RemoveToken(tokenID uint) error {
	return utu.userTokenRepository.RemoveToken(tokenID)
}
