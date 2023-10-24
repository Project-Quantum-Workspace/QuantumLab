package controller

import (
	"net/http"
	"strings"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"gopkg.in/oauth2.v3/server"
)

type OAuthController struct {
	Server       *server.Server
	Env          *bootstrap.Env
	LoginUsecase model.LoginUsecase
}

func (oac *OAuthController) AuthorizeHandler(w http.ResponseWriter, r *http.Request) {
	err := oac.Server.HandleAuthorizeRequest(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
}

func (oac *OAuthController) TokenHandler(w http.ResponseWriter, r *http.Request) {
	oac.Server.HandleTokenRequest(w, r)
}

func (oac *OAuthController) GetUserDetails(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	authHeaderSplit := strings.Split(authHeader, " ")
	if len(authHeaderSplit) != 2 || authHeaderSplit[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "unauthorized"})
		return
	}

	accessToken := authHeaderSplit[1]
	tokenInfo, err := oac.Server.Manager.LoadAccessToken(accessToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "unauthorized"})
		return
	}

	userID, err := validationutil.ValidateID(tokenInfo.GetUserID())
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "unauthorized"})
		return
	}

	user, err := oac.LoginUsecase.GetCurrentUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "unexpected system error"})
		return
	}
	c.JSON(http.StatusOK, user)
}
