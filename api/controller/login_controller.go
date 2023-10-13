package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginController struct {
	LoginUsecase model.LoginUsecase
	Env          *bootstrap.Env
}

// Login
// @Summary Log a user in
// @Description Log a user in if the provided email and password are correct.
// @Tags auth
// @Accept json
// @Produce json
// @Param credential body model.LoginRequest true "login credential"
// @Success 200 {object} model.LoginResponse
// @Failure 400 {object} model.ErrorResponse "Bad Request (Invalid Email)"
// @Failure 401 {object} model.ErrorResponse "Incorrect Email or Password"
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
	if err != nil || !validationutil.CheckHash(request.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "Incorrect Email or Password"})
		return
	}

	accessToken, err :=
		lc.LoginUsecase.CreateAccessToken(user, lc.Env.AccessJWTSecret, lc.Env.AccessJWTExpiryHour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error Creating Access Token"})
		return
	}
	refreshToken, err :=
		lc.LoginUsecase.CreateRefreshToken(user, lc.Env.RefreshJWTSecret, lc.Env.RefreshJWTExpiryHour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error Creating Refresh Token"})
		return
	}

	c.SetCookie("auth", accessToken, 7200, "/", "localhost", false, true)
	c.SetCookie("refresh", refreshToken, 7200, "/", "localhost", false, true)

	c.SetCookie("auth", accessToken, 7200, "/", "quantumlab.cloud", true, true)
	c.SetCookie("refresh", refreshToken, 7200, "/", "quantumlab.cloud", true, true)

	loginResponse := model.LoginResponse{
		Status: "Logged In Successfully",
	}

	c.JSON(http.StatusOK, loginResponse)
}

// CheckUser
// @Summary Gets user details based on the current token
// @Description Authenticates a token and retrieves associated user information
// @Tags auth
// @Accept json
// @Produce json
// @Success 200 {object} model.User
// @Failure 401 {object} model.ErrorResponse "Token is not authorized!"
// @Failure 401 {object} model.ErrorResponse "You are not authorized, there is no ID!"
// @Failure 401 {object} model.ErrorResponse "You are not authorized, could not find user from token!"
// @Failure 401 {object} model.ErrorResponse "You are not authorized, There is no token!"
// @Router /auth/currUser [get]
func (lc *LoginController) CheckUser(c *gin.Context) {
	authToken, err := tokenutil.GetAuthToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authorized, There is no token!"})
		return
	}
	auth, err := tokenutil.IsAuthenticated(authToken, lc.Env.AccessJWTSecret)
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "Token is not authorized!"})
		return
	}
	if auth {
		userID, err := tokenutil.ExtractUserID(c, lc.Env.AccessJWTSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authorized, there is no ID!"})
			return
		}
		user, err := lc.LoginUsecase.GetCurrentUser(userID)
		if err != nil {
			c.JSON(http.StatusUnauthorized,
				model.ErrorResponse{Message: "You are not authorized, could not find user from token!"})
			return
		}
		c.JSON(http.StatusOK, user)
		return
	}
}

// Logout
// @Summary Removes the JWT token from cookies
// @Description Removes both access and refresh JWT Tokens from cookies
// @Tags auth
// @Accept json
// @Produce json
// @Success 200 {object} model.LoginResponse
// @Router /auth/logout [post]
func (lc *LoginController) Logout(c *gin.Context) {
	c.SetCookie("auth", "", -1, "/", "localhost", false, true)
	c.SetCookie("refresh", "", -1, "/", "localhost", false, true)

	c.SetCookie("auth", "", -1, "/", "quantumlab.cloud", true, true)
	c.SetCookie("refresh", "", -1, "/", "quantumlab.cloud", true, true)
	logoutMessage := model.LoginResponse{Status: "Logged out successfully"}
	c.JSON(http.StatusOK, logoutMessage)
}
