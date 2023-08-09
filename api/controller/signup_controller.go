package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
)

type SignupController struct {
	SignupUsecase model.SignupUsecase
}

func (controller *SignupController) Signup(c *gin.Context) {
	var req model.SignupRequest

	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	user := model.User{
		Email:           req.Email,
		Password:        req.Password,
		QuantumlabToken: "ql_token", // mock the generation of QL token
	}

	err = controller.SignupUsecase.Create(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
