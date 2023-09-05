package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TemplateController struct {
	TemplateUsecase model.TemplateUsecase
	Env             *bootstrap.Env
}

// PostOneTemplate @Summary Create new template
// @Description Create a new template.
// @Tags templates
// @Accept json
// @Produce json
// @Param template body model.Template true "Data needed for creating a workspace template"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /templates [post]
func (tc *TemplateController) PostOneTemplate(c *gin.Context) {
	var template model.Template
	err := c.BindJSON(&template)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	res := tc.TemplateUsecase.Create(&template)
	if res != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}

	c.JSON(http.StatusCreated, model.SuccessResponse{
		Message: "success",
	})
}

// GetAllTemplates @Summary Get all authorised templates
// @Description Get all authorised templates.
// @Tags templates
// @Produce json
// @Success 200 {object} []model.Template
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /templates [get]
func (tc *TemplateController) GetAllTemplates(c *gin.Context) {
	authToken, err := tokenutil.GetAuthToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "Could not find authorization token",
		})
		return
	}
	accessLevel, err := tokenutil.ExtractAccessLevelFromToken(authToken, tc.Env.AccessJWTSecret)
	if err != nil {
		log.Println(err)
		return
	}

	var templates []model.Template

	templates, err = tc.TemplateUsecase.GetAll(accessLevel)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}
	c.JSON(http.StatusOK, templates)
}

// UpdateOneTemplate @Summary Update template
// @Description Update an existing workspace template.
// @Tags templates
// @Accept json
// @Produce json
// @Param id path uint true "Template ID"
// @Param template body model.Template true "Updated template data"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Invalid ID / Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /templates/{id} [put]
func (tc *TemplateController) UpdateOneTemplate(c *gin.Context) {
	//get id
	var template model.Template
	err := c.BindJSON(&template)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: err.Error()})
		return
	}

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid template id",
		})
		return
	}

	//tc.TemplateUsecase.First(&template, id)
	err = tc.TemplateUsecase.Update(&template, id)

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

// DeleteTemplate @Summary Delete template
// @Description Delete a workspace template.
// @Tags templates
// @Produce json
// @Param id path uint true "Template ID"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /templates/{id} [delete]
func (tc *TemplateController) DeleteTemplate(c *gin.Context) {
	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid template id",
		})
		return
	}

	err = tc.TemplateUsecase.Delete(id)

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
