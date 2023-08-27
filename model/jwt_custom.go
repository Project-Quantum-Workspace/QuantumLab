package model

import "github.com/golang-jwt/jwt/v4"

type JwtCustomClaims struct {
	Email       string `json:"email"`
	UID         uint   `json:"uid"`
	AccessLevel uint   `json:"accessLevel"`
	RoleID      []int  `json:"roleID"`
	jwt.RegisteredClaims
}

type JwtCustomRefreshClaims struct {
	Email       string `json:"email"`
	UID         uint   `json:"uid"`
	AccessLevel uint   `json:"accessLevel"`
	RoleID      []int  `json:"roleID"`
	jwt.RegisteredClaims
}
