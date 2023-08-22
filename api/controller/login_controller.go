package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

type LoginController struct {
	LoginUsecase model.LoginUsecase
	Env          *bootstrap.Env
}

// Login
// @Summary Log a user in
// @Description Log a user in if the provided email and password are correct.
// @Accept json
// @Produce json
// @Param credential body model.LoginRequest true "login credential"
// @Success 200 {object} model.LoginResponse
// @Failure 400 {object} model.ErrorResponse "Bad Request (Invalid Email)"
// @Failure 401 {object} model.ErrorResponse "Incorrect Password"
// @Failure 404 {object} model.ErrorResponse "Email Not Found"
// @Failure 500 {object} model.ErrorResponse "Error Creating Access/Refresh Token"
// @Router /auth/login [post]
func (lc *LoginController) Login(c *gin.Context) {
	var request model.LoginRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad Request (Invalid Email)"})
		return
	}

	user, err := lc.LoginUsecase.FindUser(request.Email)
	if err != nil {
		c.JSON(http.StatusNotFound, model.ErrorResponse{Message: "Email Not Found"})
		return
	}

	// TODO: Hash Passwords
	if user.Password != request.Password {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "Incorrect Password"})
		return
	}

	roles, err := lc.LoginUsecase.GetRoleID(user.ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Could not find associated role"})
		return
	}

	accessToken, err :=
		lc.LoginUsecase.CreateAccessToken(&user, roles, lc.Env.AccessJWTSecret, lc.Env.AccessJWTExpiryHour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error Creating Access Token"})
		return
	}
	refreshToken, err :=
		lc.LoginUsecase.CreateRefreshToken(&user, roles, lc.Env.RefreshJWTSecret, lc.Env.RefreshJWTExpiryHour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error Creating Refresh Token"})
		return
	}

	loginResponse := model.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		Status:       "Logged In Successfully",
	}

	c.JSON(http.StatusOK, loginResponse)
}

// CheckUser
// @Summary Gets user details based on the current token
// @Description Authenticates a token and retrieves associated user information
// @Accept json
// @Produce json
// @Success 200 {object} model.User
// @Failure 401 {object} model.ErrorResponse "Token is not authorized!"
// @Failure 401 {object} model.ErrorResponse "You are not authorized, there is no ID!"
// @Failure 401 {object} model.ErrorResponse "You are not authorized, could not find user from token!"
// @Failure 401 {object} model.ErrorResponse "You are not authorized, There is no token!"
// @Router /auth/currUser [get]
func (lc *LoginController) CheckUser(c *gin.Context) {
	authHeader := c.Request.Header.Get("Authorization")
	tokens := strings.Split(authHeader, " ")
	if len(tokens) == 2 {
		authToken := tokens[1]
		auth, err := tokenutil.IsAuthorized(authToken, lc.Env.AccessJWTSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "Token is not authorized!"})
			return
		}
		if auth {
			claims, err := tokenutil.ExtractClaimsFromToken(authToken, lc.Env.AccessJWTSecret)
			if err != nil {
				c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authorized, there is no ID!"})
				print(err)
				return
			}
			userEmail := claims["email"].(string)
			user, err := lc.LoginUsecase.FindUser(userEmail)
			if err != nil {
				c.JSON(http.StatusUnauthorized,
					model.ErrorResponse{Message: "You are not authorized, could not find user from token!"})
				return
			}
			c.JSON(http.StatusOK, user)
			return
		}
	} else {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authorized, There is no token!"})
		return
	}
}
