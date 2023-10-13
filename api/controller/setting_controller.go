package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type SettingController struct {
	UserUsecase model.UserUsecase
	Env         *bootstrap.Env
}

// @Summary Update user setting
// @Description Update user in setting.
// @Tags settings
// @Accept json
// @Produce json
// @Param workspace body model.User true "Updated user"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /settings/users [put]
func (uc *SettingController) UpdateUser(c *gin.Context) {
	userID, err := tokenutil.ExtractUserID(c, uc.Env.AccessJWTSecret)
	if err != nil {
		logrus.Errorf("error parsing token: %v", err)
		c.JSON(http.StatusForbidden, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	var user model.User
	err = c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	user.ID = userID
	err = uc.UserUsecase.UpdateUser(&user)
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
