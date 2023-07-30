package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// var tc.TemplateRepo *gorm.tc.TemplateRepo
var req model.Template

type TemplateControllor struct {
	TemplateRepo *gorm.DB
}

// create new template
func (tc *TemplateControllor) PostOneTemplate(c *gin.Context) {

	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad Request(Invalid Request Body)"})
		return
	}
	template := model.Template{
		Parameters:   req.Parameters,
		Access_level: req.Access_level,
		File_name:    req.File_name,
	}
	res := tc.TemplateRepo.Create(&template)
	if res.Error != nil {
		c.JSON(400, gin.H{
			"status": 400,
			"post":   res.Error,
		})
		return
	}

	c.JSON(200, gin.H{
		"status": 200,
		"post":   template,
	})
}

// read all templates
func (tc *TemplateControllor) GetAllTemplates(c *gin.Context) {
	var templates []model.Template

	tc.TemplateRepo.Find(&templates)
	c.JSON(200, gin.H{
		"status":  200,
		"message": templates,
	})
}

// update template with id
func (tc *TemplateControllor) UpdateOneTemplate(c *gin.Context) {
	//get id
	id := c.Param("id")
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad Request(Invalid Request Body)"})
		return
	}
	var template model.Template
	tc.TemplateRepo.First(&template, id)
	if template.Id == 0 {
		c.JSON(404, gin.H{
			"status":  404,
			"message": "The Template Id is invalid",
		})
		return
	}
	//update
	tc.TemplateRepo.Model(&template).Updates(model.Template{
		Parameters:   req.Parameters,
		Access_level: req.Access_level,
		File_name:    req.File_name,
	})
	//respond
	c.JSON(200, gin.H{
		"status":  200,
		"message": template,
	})

}

// delete template with id
func (tc *TemplateControllor) DeleteTemplate(c *gin.Context) {
	id := c.Param("id")
	var template model.Template
	tc.TemplateRepo.First(&template, id)
	if(template.Id==0){
		c.JSON(404, gin.H{
			"status":  404,
			"message": "The Template Id is invalid",
		})
		return
	}
	tc.TemplateRepo.Delete(&model.Template{}, id)

	c.JSON(200, gin.H{
		"status":  200,
		"message": "successfully delete template",
	})
}
