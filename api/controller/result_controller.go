package controller

import (
	"net/http"

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

	res := controller.ResultUsecase.Create(&tableRequest)
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
