package model

import "github.com/golang-jwt/jwt/v4"

type JwtCustomClaims struct {
	Email       string `json:"email"`
	UserID      uint   `json:"userID"`
	AccessLevel uint   `json:"accessLevel"`
	RoleIDs     []uint `json:"roleIDs"`
	jwt.RegisteredClaims
}

type JwtCustomRefreshClaims struct {
	Email       string `json:"email"`
	UserID      uint   `json:"userID"`
	AccessLevel uint   `json:"accessLevel"`
	RoleIDs     []uint `json:"roleIDs"`
	jwt.RegisteredClaims
}
