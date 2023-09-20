package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
)

type NewUserInitializerController struct {
	UserInitUsecase model.NewUserInitUsecase
}

// @Summary Initialize root admin
// @Description Create the first user as a Root Administrator.
// @Tags init
// @Accept json
// @Produce json
// @Success 201 {object} model.SuccessResponse
// Failure 400 {object} model.ErrorResponse "Bad Request"
// Failure 403 {object} model.ErrorResponse "Forbidden"
// @Router /init [post]
func (uac *NewUserInitializerController) InitRootAdmin(c *gin.Context) {
	var initRequest model.InitRequest
	err := c.ShouldBindJSON(&initRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "bad request",
		})
		return
	}

	res := uac.UserInitUsecase.CreateRootAdmin(&initRequest)
	if res != nil {
		c.JSON(http.StatusForbidden, model.ErrorResponse{
			Message: res.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, model.SuccessResponse{
		Message: "success",
	})
}

// @Summary Get if has user
// @Description Check if QL has users already.
// @Tags init
// @Accept json
// @Produce json
// @Success 200 {object} object{hasUser=bool}
// @Router /init [get]
func (uac *NewUserInitializerController) CheckHasUser(c *gin.Context) {
	count, err := uac.UserInitUsecase.GetUserCount()
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}
	if count > 0 {
		c.JSON(http.StatusOK, gin.H{
			"hasUser": true,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"hasUser": false,
		})
	}
}
