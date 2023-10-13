package tokenutil

import (
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/golang-jwt/jwt/v4"
)

func CreateAccessToken(user *model.User, secret string, expiry int) (accessToken string, err error) {
	roleIDs := processRoles(user)
	exp := time.Now().Add(time.Hour * time.Duration(expiry))
	claims := &model.JwtCustomClaims{
		Email:       user.Email,
		UserID:      user.ID,
		AccessLevel: user.AccessLevel,
		RoleIDs:     roleIDs,
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

func CreateRefreshToken(user *model.User, secret string, expiry int) (refreshToken string, err error) {
	roleIDs := processRoles(user)
	claimsRefresh := &model.JwtCustomRefreshClaims{
		Email:       user.Email,
		UserID:      user.ID,
		AccessLevel: user.AccessLevel,
		RoleIDs:     roleIDs,
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

func processRoles(user *model.User) []uint {
	var roleIDs []uint
	for _, role := range user.Roles {
		roleIDs = append(roleIDs, *(role.ID))
	}
	return roleIDs
}

func GetAuthToken(c *gin.Context) (token string, err error) {
	auth, err := c.Cookie("auth")
	if err != nil {
		return "token not found", err
	}
	return auth, err
}

func IsAuthenticated(requestToken string, secret string) (bool, error) {
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

func ExtractUserID(c *gin.Context, secret string) (uint, error) {
	token, err := GetAuthToken(c)
	if err != nil {
		return 0, err
	}
	claims, err := ExtractClaimsFromToken(token, secret)
	if err != nil {
		return 0, err
	}
	return claims.UserID, nil
}

func ExtractRoleIDs(c *gin.Context, secret string) ([]uint, error) {
	token, err := GetAuthToken(c)
	if err != nil {
		return nil, err
	}
	claims, err := ExtractClaimsFromToken(token, secret)
	if err != nil {
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
