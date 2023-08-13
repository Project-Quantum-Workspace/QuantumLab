package controller

import (
	"net/http"
	"time"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"github.com/gin-gonic/gin"
)

// vulnerability: a user can peek or manipulate another user's workspace metadata
type WorkspaceController struct {
	WorkspaceUsecase model.WorkspaceUsecase
}

// @Summary Create workspace
// @Description Create a workspace.
// @Tags workspaces
// @Accept json
// @Produce json
// @Param workspace body model.CreateWorkspaceRequest true "New workspace with the UUID of owner"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces [post]
func (controller *WorkspaceController) Create(c *gin.Context) {
	var workspaceRequest model.CreateWorkspaceRequest

	err := c.BindJSON(&workspaceRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	workspace := workspaceRequest.Workspace
	userUUID := workspaceRequest.UserUUID

	// get last accessed timestamp
	workspace.LastAccessed = time.Now()

	err = controller.WorkspaceUsecase.Create(&workspace, userUUID)
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

// @Summary Get all workspaces by user
// @Description Get all workspaces of a user. An empty array is returned if the user has no workspace.
// @Tags workspaces
// @Produce json
// @Param uuid path string true "User UUID"
// @Success 200 {object} []model.Workspace
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces/users/{uuid} [get]
func (controller *WorkspaceController) GetAllByUser(c *gin.Context) {
	var workspaces []model.Workspace

	userUUID := c.Param("uuid")
	workspaces, err := controller.WorkspaceUsecase.GetAllByUser(userUUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	// write into reponse an empty array instead of null if no rows are returned
	if workspaces == nil {
		workspaces = []model.Workspace{}
	}
	c.JSON(http.StatusOK, workspaces)
}

// @Summary Get workspace by UUID
// @Description Get a workspace by its UUID.
// @Tags workspaces
// @Produce json
// @Param uuid path string true "Workspace UUID"
// @Success 200 {object} model.Workspace
// @Failure 500 {object} model.ErrorResponse "Workspace Not Found"
// @Router /workspaces/{uuid} [get]
func (controller *WorkspaceController) GetByUUID(c *gin.Context) {
	var workspace model.Workspace

	uuid := c.Param("uuid")
	workspace, err := controller.WorkspaceUsecase.GetByUUID(uuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, workspace)
}

// @Summary Update workspace
// @Description Update specific fields of a workspace.
// @Tags workspaces
// @Accept json
// @Produce json
// @Param uuid path string true "Workspace UUID"
// @Param workspace body model.Workspace true "Updated workspace metadata"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces/{uuid} [patch]
func (controller *WorkspaceController) Update(c *gin.Context) {
	var workspace model.Workspace

	uuid := c.Param("uuid")
	err := c.BindJSON(&workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	err = controller.WorkspaceUsecase.Update(&workspace, uuid)
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
// @Tags workspaces
// @Produce json
// @Param uuid path string true "Workspace UUID"
// @Success 200 {object} model.SuccessResponse
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces/{uuid} [delete]
func (controller *WorkspaceController) Delete(c *gin.Context) {
	uuid := c.Param("uuid")
	err := controller.WorkspaceUsecase.Delete(uuid)
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
