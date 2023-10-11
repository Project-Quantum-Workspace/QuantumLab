package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserTokenController struct {
	UserTokenUsecase model.UserTokenUsecase
	Env              *bootstrap.Env
}

// GetUserTokens
// @Summary Gets all tokens of a user
// @Description Retrieves all the tokens associated with the logged-in user
// @Tags token management
// @Accept json
// @Produce json
// @Success 200 {object} []model.Token
// @Failure 400 {object} model.ErrorResponse "Bad Request"
// @Router /api/token/list [get]
func (utc *UserTokenController) GetUserTokens(c *gin.Context) {
	userID, err := tokenutil.ExtractUserID(c, utc.Env.AccessJWTSecret)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad request (Could not find user)"})
		return
	}

	tokens, err := utc.UserTokenUsecase.GetUserTokens(userID)
	c.JSON(http.StatusOK, tokens)
}

// AddToken
// @Summary Adds a new token with association to the user
// @Description Logged-in user adds a new token to their account
// @Tags token management
// @Accept json
// @Produce json
// @Param request body model.TokenRequest true "Token Request"
// @Success 200 {object} model.SuccessResponse "Successfully added token!"
// @Failure 400 {object} model.ErrorResponse "Bad Request (Invalid Format)"
// @Failure 400 {object} model.ErrorResponse "Bad Request (Could not find user)"
// @Failure 412 {object} model.ErrorResponse "Token for this service already exists!"
// @Failure 500 {object} model.ErrorResponse "Internal Error (Could not add token)"
// @Router /api/token/add [post]
func (utc *UserTokenController) AddToken(c *gin.Context) {
	var request model.TokenRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad Request (Invalid Format)"})
		return
	}

	userID, err := tokenutil.ExtractUserID(c, utc.Env.AccessJWTSecret)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad request (Could not find user)"})
		return
	}

	checkToken := utc.UserTokenUsecase.CheckRequest(request.Name, userID)
	if len(checkToken) > 0 {
		c.JSON(http.StatusPreconditionFailed, model.ErrorResponse{Message: "Token for this service already exists!"})
		return
	}

	err = utc.UserTokenUsecase.AddToken(request, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Internal Error (Could not add token)"})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{Message: "Successfully added token!"})
}

// EditToken
// @Summary Adjusts value of the designated token
// @Description Adjusts the value of the token provided
// @Tags token management
// @Accept json
// @Produce json
// @Param request body model.TokenRequest true "Token Request"
// @Success 200 {object} model.SuccessResponse "Successfully modified token!"
// @Failure 400 {object} model.ErrorResponse "Bad Request (Invalid Format)"
// @Failure 400 {object} model.ErrorResponse "Bad Request (Could not find user)"
// @Failure 500 {object} model.ErrorResponse "Internal Error (Could not add token)"
// @Failure 500 {object} model.ErrorResponse "Internal Error (Failed to edit token)"
// @Router /api/token/add [patch]
func (utc *UserTokenController) EditToken(c *gin.Context) {
	var request model.TokenRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad Request (Invalid Format)"})
		return
	}

	userID, err := tokenutil.ExtractUserID(c, utc.Env.AccessJWTSecret)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad request (Could not find user)"})
		return
	}

	checkToken := utc.UserTokenUsecase.CheckRequest(request.Name, userID)

	if len(checkToken) < 1 {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Internal Error (Could not find token)"})
		return
	}

	err = utc.UserTokenUsecase.EditToken(request, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Internal Error (Failed to edit token)"})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{Message: "Successfully modified token!"})
}

// RemoveToken
// @Summary Removes the designated token from the database
// @Description Removes the designated token from the database
// @Tags token management
// @Accept json
// @Produce json
// @Param request body model.TokenDeleteRequest true "Token Request"
// @Success 200 {object} model.SuccessResponse "Successfully removed token!"
// @Failure 400 {object} model.ErrorResponse "Bad Request (Invalid Format)"
// @Failure 400 {object} model.ErrorResponse "Bad Request (Could not find user)"
// @Failure 500 {object} model.ErrorResponse "Internal Error (Could not find token)"
// @Failure 500 {object} model.ErrorResponse "Internal Error (Failed to delete token)"
// @Router /api/token/add [delete]
func (utc *UserTokenController) RemoveToken(c *gin.Context) {
	var request model.TokenDeleteRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad Request (Invalid Format)"})
		return
	}

	userID, err := tokenutil.ExtractUserID(c, utc.Env.AccessJWTSecret)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad request (Could not find user)"})
		return
	}

	checkToken := utc.UserTokenUsecase.CheckRequest(request.Name, userID)
	if len(checkToken) < 1 {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Internal Error (Could not find token)"})
		return
	}

	err = utc.UserTokenUsecase.RemoveToken(checkToken[0].ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Internal Error (Failed to delete token)"})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{Message: "Successfully removed token!"})
}
