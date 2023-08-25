package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
)

type UserAdminController struct {
	Env              *bootstrap.Env
	UserAdminUsecase model.UserAdminUsecase
}

func (uac *UserAdminController) InviteUsers(c *gin.Context) {
	var emailList []string

	err := c.BindJSON(&emailList)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	if len(emailList) > 100 {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "too many users to invite",
		})
		return
	}

	err = uac.UserAdminUsecase.InviteUsers(
		emailList,
		uac.Env.EmailServiceHost,
		uac.Env.EmailServicePort,
		uac.Env.EmailServiceAddress,
		uac.Env.EmailServiceSecret,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusAccepted, model.SuccessResponse{
		Message: "Request accepted. Please check the quantumlab email service's sent emails for more details.",
	})
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

func (uac *UserAdminController) UpdateUser(c *gin.Context) {
	var user model.User

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid user id",
		})
		return
	}

	err = c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	user.ID = id
	err = uac.UserAdminUsecase.UpdateUser(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})
}
