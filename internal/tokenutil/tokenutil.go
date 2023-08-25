package tokenutil

import (
	"fmt"
	"log"
	"time"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/golang-jwt/jwt/v4"
)

func CreateAccessToken(user *model.User, roles []int, secret string, expiry int) (accessToken string, err error) {
	exp := time.Now().Add(time.Hour * time.Duration(expiry))
	claims := &model.JwtCustomClaims{
		Email:       user.Email,
		UID:         user.ID,
		AccessLevel: user.AccessLevel,
		RoleID:      roles,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(exp),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}
	return t, err
}

func CreateRefreshToken(user *model.User, roles []int, secret string, expiry int) (refreshToken string, err error) {
	claimsRefresh := &model.JwtCustomRefreshClaims{
		Email:       user.Email,
		UID:         user.ID,
		AccessLevel: user.AccessLevel,
		RoleID:      roles,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(expiry))),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsRefresh)
	rt, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}
	return rt, err
}

func IsAuthorized(requestToken string, secret string) (bool, error) {
	_, err := jwt.Parse(requestToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return false, err
	}
	return true, nil
}

func ExtractClaimsFromToken(requestToken string, secret string) (claims jwt.MapClaims, err error) {
	token, err := jwt.Parse(requestToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok && !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}

func ExtractAccessLevelFromToken(requestToken string, secret string) (accessLevel string, err error) {
	claims, err := ExtractClaimsFromToken(requestToken, secret)
	if err != nil {
		log.Println(err)
		return "", err
	}
	return fmt.Sprintf("%v", claims["accessLevel"].(float64)), nil
}
