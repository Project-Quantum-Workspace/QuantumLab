package controller

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/parserutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"

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
	err := c.ShouldBindJSON(&template)
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

// GetTemplateByID @summary get one template
// @Description get the template with its id
// @Tags templates
// @Produce json
// @Param id path uint true "Template ID"
// @Success 200 {object} model.Template
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /templates/{id} [get]
func (tc *TemplateController) GetTemplateByID(c *gin.Context) {
	var template model.Template
	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid template id",
		})
		return
	}
	template, err = tc.TemplateUsecase.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}
	c.JSON(http.StatusOK, template)

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
	err := c.ShouldBindJSON(&template)
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

// GetPresetIconList @Summary Get template
// @Description Get the preset template icons.
// @Tags templates
// @Produce json
// @Success 200
// @Failure 500 {object} model.ErrorResponse "Failed to retrieve file list"
// @Router /templates/icons [get]
func (tc *TemplateController) GetPresetIconList(c *gin.Context) {
	fileList, err := listFilesInDirectory("./website/dist/icons/")
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Failed to retrieve file list"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"files": fileList})
}

func listFilesInDirectory(directoryPath string) ([]string, error) {
	var fileList []string

	err := filepath.Walk(directoryPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() {
			fileList = append(fileList, info.Name())
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return fileList, nil
}

// UploadFile @Summary Upload file and parse the parameters
// @Description Get the preset template icons.
// @Tags templates
// @Param multipart/form-data
// @Produce json
func (tc *TemplateController) UploadFile(c *gin.Context) {

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid template id",
		})
		return
	}

	file, _, err := c.Request.FormFile("file")
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "Failed to load file",
		})
		return
	}

	// Read the file into byte slice

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read the file"})
		return
	}

	// Insert the file into the database
	err = tc.TemplateUsecase.UploadFile(id, fileBytes)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"msg": "file successfully uploaded",
	})
}

func (tc *TemplateController) ParseYaml(c *gin.Context) {
	var requestBody map[string]string

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	yamlstr := requestBody["data"]
	// TODO: get parsed template string
	jsonstr, err := parserutil.YamlToJSON(yamlstr)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		c.JSON(http.StatusBadRequest, "Error retrieving the yaml")
		return
	}
	//response with retrived data string
	c.JSON(http.StatusOK, gin.H{
		"msg":    "file successfully parsed",
		"params": jsonstr,
	})
}
