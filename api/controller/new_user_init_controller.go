package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type NewUserInitializerController struct {
	UserInitUsecase model.NewUserInitUsecase
}

// @Summary Post the first user
// @Description Create the first user.
// @Tags user admin
// @Accept json
// @Produce json
// @Success 200 {object} model.User
// Failure 400 {object} model.ErrorResponse "bad request"
// Failure 409 {object} model.ErrorResponse "error creating the first user"
// @Router /init [post]
func (uac *NewUserInitializerController) NewUserInitializer(c *gin.Context) {
	var user model.User
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "bad request",
		})
		return
	}

	res := uac.UserInitUsecase.CreateFirstUser(user)
	if res != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
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
// @Tags user admin
// @Accept json
// @Produce json
// @Success 200 {object} map[string]interface{} "hasUser": true
// Failure 500 {object} model.ErrorResponse "error counting users: %v"
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
