package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
)

type UserAdminController struct {
	UserAdminUsecase model.UserAdminUsecase
}

func (uac *UserAdminController) GetUserList(c *gin.Context) {
	users, err := uac.UserAdminUsecase.GetUserList()
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}
	c.JSON(http.StatusOK, users)
}

func (uac *UserAdminController) GetUserDetail(c *gin.Context) {
	var user model.User

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid user id",
		})
		return
	}

	user, err = uac.UserAdminUsecase.GetUserDetail(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}

	c.JSON(http.StatusOK, user)
}
