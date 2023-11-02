package controller

import (
	"net/http"
	"strings"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
)

type ResultController struct {
	ResultUsecase model.ResultUsecase
}

func (controller *ResultController) Create(c *gin.Context) {
	var tableRequest model.CreateTableRequest
	err := c.ShouldBindJSON(&tableRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Missing QuantumLab token"})
		return
	}
	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Invalid authorization header format"})
		return
	}
	token := tokenParts[1]
	tokenExists, err := controller.ResultUsecase.CheckToken(token)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: err.Error()})
		return
	}
	if !tokenExists {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Token does not exist"})
		return
	}

	res := controller.ResultUsecase.Create(&tableRequest, token)
	if res != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: res.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})
}
