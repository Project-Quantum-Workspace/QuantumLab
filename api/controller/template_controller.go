package controller

import (
	"net/http"
	"strconv"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"github.com/gin-gonic/gin"
)

type TemplateController struct {
	TemplateUsecase model.TemplateUsecase
}

// create new template
func (tc *TemplateController) PostOneTemplate(c *gin.Context) {
	var template model.Template
	err := c.BindJSON(&template)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: err.Error()})
		return
	}

	res := tc.TemplateUsecase.Create(&template)
	if res != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})
}

// read all templates
func (tc *TemplateController) GetAllTemplates(c *gin.Context) {
	var templates []model.Template

	templates, err := tc.TemplateUsecase.GetAll()
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: err.Error()})
		return
	}
	c.JSON(http.StatusOK, templates)
}

// update template with id
func (tc *TemplateController) UpdateOneTemplate(c *gin.Context) {
	//get id
	var template model.Template
	err := c.BindJSON(&template)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: err.Error()})
		return
	}
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}
	if id <= 0 {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "workspace id must be a positive integer",
		})
		return
	}
	//tc.TemplateUsecase.First(&template, id)
	err = tc.TemplateUsecase.Update(&template, uint(id))

	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})

}

// delete template with id
func (tc *TemplateController) DeleteTemplate(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}
	if id <= 0 {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "workspace id must be a positive integer",
		})
		return
	}

	err = tc.TemplateUsecase.Delete(uint(id))

	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, model.SuccessResponse{
		Message: "success",
	})
}
