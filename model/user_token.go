package model

type Token struct {
	ID     uint   `json:"id"`
	UserID uint   `json:"userId"`
	Name   string `json:"name"`
	Value  string `json:"value"`
}

type TokenRequest struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type TokenDeleteRequest struct {
	Name string `json:"name"`
}

type UserTokenUsecase interface {
	GetUserTokens(userID uint) ([]Token, error)
	AddToken(request TokenRequest, userID uint) error
	CheckRequest(name string, uid uint) []Token
	EditToken(request TokenRequest, uid uint) error
	RemoveToken(tokenID uint) error
}

type UserTokenRepository interface {
	GetUserTokens(uid uint) ([]Token, error)
	AddToken(request Token) error
	CheckRequest(name string, uid uint) []Token
	EditToken(request TokenRequest, uid uint) error
	RemoveToken(tokenID uint) error
}
