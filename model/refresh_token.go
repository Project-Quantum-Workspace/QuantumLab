package model

type RefreshTokenRequest struct {
	RefreshToken string `form:"refreshToken" binding:"required"`
}

type RefreshTokenResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type RefreshTokenUsecase interface {
	FindUser(id string) (*User, error)
	CreateAccessToken(user *User, roles []uint, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *User, roles []uint, secret string, expiry int) (refreshToken string, err error)
	ExtractClaimsFromToken(requestToken string, secret string) (*JwtCustomClaims, error)
}
