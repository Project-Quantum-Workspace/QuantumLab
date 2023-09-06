package tokenutil

import (
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/golang-jwt/jwt/v4"
)

func CreateAccessToken(user *model.User, roles []uint, secret string, expiry int) (accessToken string, err error) {
	exp := time.Now().Add(time.Hour * time.Duration(expiry))
	claims := &model.JwtCustomClaims{
		Email:       user.Email,
		UserID:      user.ID,
		AccessLevel: user.AccessLevel,
		RoleIDs:     roles,
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

func CreateRefreshToken(user *model.User, roles []uint, secret string, expiry int) (refreshToken string, err error) {
	claimsRefresh := &model.JwtCustomRefreshClaims{
		Email:       user.Email,
		UserID:      user.ID,
		AccessLevel: user.AccessLevel,
		RoleIDs:     roles,
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

func GetAuthToken(c *gin.Context) (token string, err error) {
	auth, err := c.Cookie("Authorization")
	if err != nil {
		return "token not found", err
	}
	return auth, err
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

func ExtractClaimsFromToken(requestToken string, secret string) (*model.JwtCustomClaims, error) {
	var claims model.JwtCustomClaims
	_, err := jwt.ParseWithClaims(requestToken, &claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	return &claims, nil
}

func ExtractRoleIDs(c *gin.Context, secret string) (roleIDs []uint, err error) {
	token, err := GetAuthToken(c)
	if err != nil {
		logrus.Error(err)
		return nil, err
	}
	claims, err := ExtractClaimsFromToken(token, secret)
	if err != nil {
		logrus.Error(err)
		return nil, err
	}
	return claims.RoleIDs, nil
}

func ExtractAccessLevelFromToken(requestToken string, secret string) (accessLevel string, err error) {
	claims, err := ExtractClaimsFromToken(requestToken, secret)
	if err != nil {
		log.Println(err)
		return "", err
	}
	return fmt.Sprintf("%v", claims.AccessLevel), nil
}
