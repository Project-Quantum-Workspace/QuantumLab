package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
)

type userTokenRepository struct {
	qlDB *gorm.DB
}

func NewUserTokenRepository(db *gorm.DB) model.UserTokenRepository {
	return &userTokenRepository{
		qlDB: db,
	}
}

func (utr *userTokenRepository) GetUserTokens(uid uint) ([]model.Token, error) {
	var userTokens []model.Token
	result := utr.qlDB.Raw(`SELECT * FROM tokens WHERE tokens.user_id = ?`, uid).Scan(&userTokens)
	if result.Error != nil {
		return userTokens, result.Error
	}
	return userTokens, result.Error
}

func (utr *userTokenRepository) AddToken(request model.Token) error {
	result := utr.qlDB.Omit("ID").Create(&request)
	return result.Error
}

func (utr *userTokenRepository) CheckRequest(name string, uid uint) []model.Token {
	var tokens []model.Token
	result := utr.qlDB.Raw(`SELECT * FROM tokens WHERE tokens.name = ? AND tokens.user_id = ?`, name, uid).Scan(&tokens)
	if result.Error != nil {
		return tokens
	}
	return tokens
}

func (utr *userTokenRepository) EditToken(request model.TokenRequest, uid uint) error {
	result := utr.qlDB.Model(&model.Token{}).Where("name = ? AND user_id = ?", request.Name, uid).Update("value", request.Value)
	return result.Error
}

func (utr *userTokenRepository) RemoveToken(tokenID uint) error {
	result := utr.qlDB.Delete(&model.Token{}, tokenID)
	return result.Error
}
