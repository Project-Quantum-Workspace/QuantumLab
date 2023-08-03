package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type WorkspaceController struct {
	WorkspaceUsecase model.WorkspaceUsecase
}

// @Summary Create workspace
// @Description Create a workspace.
// @Accept json
// @Produce json
// @Param workspace body model.Workspace true "Workspace metadata"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "JSON Parse Error"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspace/create [post]
func (controller *WorkspaceController) Create(c *gin.Context) {
	var workspace model.Workspace

	err := c.BindJSON(&workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	// get last accessed timestamp
	workspace.LastAccessed = time.Now()

	err = controller.WorkspaceUsecase.Create(&workspace)
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

// @Summary Get workspace by ID
// @Description Get a workspace by its ID.
// @Produce json
// @Param id path uint true "Workspace ID"
// @Success 200 {object} model.Workspace
// @Failure 400 {object} model.ErrorResponse "Illegal Workspace ID"
// @Failure 500 {object} model.ErrorResponse "Workspace Not Found"
// @Router /workspace/:id [get]
func (controller *WorkspaceController) GetByID(c *gin.Context) {
	var workspace model.Workspace

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

	workspace, err = controller.WorkspaceUsecase.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, workspace)
}

// @Summary Update workspace
// @Description Update a workspace.
// @Accept json
// @Produce json
// @Param workspace body model.Workspace true "Updated workspace metadata"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "JSON Parse Error"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspace/update [post]
func (controller *WorkspaceController) Update(c *gin.Context) {
	var workspace model.Workspace

	err := c.BindJSON(&workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	err = controller.WorkspaceUsecase.Update(&workspace)
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

// @Summary Delete workspace
// @Description Delete a workspace by its ID.
// @Produce json
// @Param id path uint true "Workspace ID"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Illegal Workspace ID"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspace/delete/:id [post]
func (controller *WorkspaceController) Delete(c *gin.Context) {
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

	err = controller.WorkspaceUsecase.Delete(uint(id))
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
