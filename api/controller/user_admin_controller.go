package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"golang.org/x/exp/slices"
)

type UserAdminController struct {
	Env              *bootstrap.Env
	UserAdminUsecase model.UserAdminUsecase
}

func (uac *UserAdminController) isAuthorized(c *gin.Context) bool {
	// authorize role
	// only Root and Administrator can access these APIs
	roleIDs, err := tokenutil.ExtractRoleIDs(c, uac.Env.AccessJWTSecret)
	if err != nil ||
		(!slices.Contains(roleIDs, 0) && !slices.Contains(roleIDs, 1)) {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{
			Message: "unauthorized",
		})
		return false
	}
	return true
}

// @Summary Invite and create users
// @Description Invite and create new users.
// @Tags user admin
// @Accept json
// @Produce json
// @Param emailList body []string true "List of user emails to send invitation"
// @Success 202 {object} model.SuccessResponse "Request Accepted"
// @Failure 400 {object} model.ErrorResponse "Bad Request"
// @Router /admin/users/invite [post]
func (uac *UserAdminController) InviteUsers(c *gin.Context) {
	if !uac.isAuthorized(c) {
		return
	}

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
		Message: "Request accepted. Please check the service email account for more detail.",
	})
}

// @Summary Get user list
// @Description Get all users to list in the table.
// @Tags user admin
// @Produce json
// @Success 200 {object} []model.UserListItem
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /admin/users [get]
func (uac *UserAdminController) GetUserList(c *gin.Context) {
	if !uac.isAuthorized(c) {
		return
	}

	users, err := uac.UserAdminUsecase.GetUserList()
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}
	c.JSON(http.StatusOK, users)
}

// @Summary Get user detail
// @Description Get detailed information of a user.
// @Tags user admin
// @Produce json
// @Param id path uint true "User ID"
// @Success 200 {object} model.User
// @Failure 400 {object} model.ErrorResponse "Bad Request"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /admin/users/{id} [get]
func (uac *UserAdminController) GetUserDetail(c *gin.Context) {
	if !uac.isAuthorized(c) {
		return
	}

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid user id",
		})
		return
	}

	user, err := uac.UserAdminUsecase.GetUserDetail(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

// @Summary Update user
// @Description Update a user.
// @Tags user admin
// @Accept json
// @Produce json
// @Param id path uint true "User ID"
// @Param user body model.User true "Updated user information"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Bad Request"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /admin/users/{id} [put]
func (uac *UserAdminController) UpdateUser(c *gin.Context) {
	if !uac.isAuthorized(c) {
		return
	}

	var user *model.User
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
