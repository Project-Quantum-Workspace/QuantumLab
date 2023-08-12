package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"github.com/gin-gonic/gin"
)

type WorkspaceController struct {
	WorkspaceUsecase model.WorkspaceUsecase
}

// @Summary Create workspace
// @Description Create a workspace.
// @Tags workspaces
// @Accept json
// @Produce json
// @Param create_workspace_request body model.CreateWorkspaceRequest true "Workspace create request with workspace metadata and userID"
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
	userID := workspaceRequest.UserID

	// get last accessed timestamp
	workspace.LastAccessed = time.Now()

	err = controller.WorkspaceUsecase.Create(&workspace, userID)
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
// @Param id path uint true "User ID"
// @Success 200 {object} []model.Workspace
// @Failure 400 {object} model.ErrorResponse "Illegal User ID"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces/users/{id} [get]
func (controller *WorkspaceController) GetAllByUser(c *gin.Context) {
	var workspaces []model.Workspace

	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}
	if userID <= 0 {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "user id must be a positive integer",
		})
		return
	}

	workspaces, err = controller.WorkspaceUsecase.GetAllByUser(uint(userID))
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

// @Summary Get workspace by ID
// @Description Get a workspace by its ID.
// @Tags workspaces
// @Produce json
// @Param id path uint true "Workspace ID"
// @Success 200 {object} model.Workspace
// @Failure 400 {object} model.ErrorResponse "Illegal Workspace ID"
// @Failure 500 {object} model.ErrorResponse "Workspace Not Found"
// @Router /workspaces/{id} [get]
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
// @Description Update specific fields of a workspace.
// @Tags workspaces
// @Accept json
// @Produce json
// @Param id path uint true "Workspace ID"
// @Param workspace body model.Workspace true "Updated workspace metadata"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces/{id} [patch]
func (controller *WorkspaceController) Update(c *gin.Context) {
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

	err = c.BindJSON(&workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	workspace.ID = uint(id)
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
// @Tags workspaces
// @Produce json
// @Param id path uint true "Workspace ID"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Illegal Workspace ID"
// @Failure 500 {object} model.ErrorResponse "Database Query Error"
// @Router /workspaces/{id} [delete]
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
