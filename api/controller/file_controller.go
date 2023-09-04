package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type FileController struct {
	FileUsecase model.FileUsecase
	Env         *bootstrap.Env
}

// CreateFile
// @Summary Upload a file
// @Description Upload a new file.
// @Tags files
// @Accept json
// @Produce json
// @Param file body model.File true "Data needed for uploading a file"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /files [post]
func (fc *FileController) CreateFile(c *gin.Context) {
	var file model.File
	err := c.BindJSON(&file)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	err = fc.FileUsecase.Create(&file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}

	c.JSON(http.StatusCreated, model.SuccessResponse{
		Message: "success",
	})
}

// GetFileByID
// @Summary Get a file
// @Description Get a file.
// @Tags files
// @Accept json
// @Produce json
// @Param id path uint true "File ID"
// @Success 200 {object} model.File
// @Failure 400 {object} model.ErrorResponse "Invalid File ID"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /files/{id} [get]
func (fc *FileController) GetFileByID(c *gin.Context) {
	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid file id",
		})
		return
	}

	file, err := fc.FileUsecase.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
		})
		return
	}

	c.JSON(http.StatusOK, file)
}
