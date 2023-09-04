package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type NewUserInitializerController struct {
	UserInitUsecase model.NewUserInitUsecase
}

// @Summary Check it is first user
// @Description Check it is first user.
// @Tags user admin
// @Accept json
// @Produce json
// @Success 200 {object} model.User
// Failure 409 {object} model.ErrorResponse "There are already users in the database"
// @Router /init [get]
func (uac *NewUserInitializerController) NewUserInitializer(c *gin.Context) {
	user, err := uac.UserInitUsecase.CreateFirstUser()
	if err != nil {
		if err.Error() == "has users" {
			c.JSON(http.StatusConflict, model.ErrorResponse{
				Message: "There are already users in the database",
			})
		}
		return
	}
	c.JSON(http.StatusOK, user)
}
