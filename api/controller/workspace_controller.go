package controller

import (
	"net/http"
	"time"

	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
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
// @Param workspace body model.CreateWorkspaceRequest true "New workspace with the ID of owner"
// @Success 201 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Uexpected System Error"
// @Router /workspaces [post]
func (wc *WorkspaceController) Create(c *gin.Context) {
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

	err = wc.WorkspaceUsecase.Create(&workspace, userID)
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

// @Summary Get all workspaces by user
// @Description Get all workspaces of a user. An empty array is returned if the user has no workspace.
// @Tags workspaces
// @Produce json
// @Param id path uint true "User ID"
// @Success 200 {object} []model.Workspace
// @Failure 400 {object} model.ErrorResponse "Invalid ID"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /workspaces/users/{id} [get]
func (wc *WorkspaceController) GetAllByUser(c *gin.Context) {
	var workspaces []model.Workspace

	userID, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid user id",
		})
		return
	}

	workspaces, err = wc.WorkspaceUsecase.GetAllByUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
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
// @Failure 400 {object} model.ErrorResponse "Invalid ID"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /workspaces/{id} [get]
func (wc *WorkspaceController) GetByID(c *gin.Context) {
	var workspace model.Workspace

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid workspace id",
		})
		return
	}

	workspace, err = wc.WorkspaceUsecase.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{
			Message: "unexpected system error",
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
// @Failure 400 {object} model.ErrorResponse "Invalid ID / Request Parse Error"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /workspaces/{id} [patch]
func (wc *WorkspaceController) Update(c *gin.Context) {
	var workspace model.Workspace

	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid workspace id",
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

	// workspace ID in payload should match the path variable
	workspace.ID = id
	err = wc.WorkspaceUsecase.Update(&workspace)
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

// @Summary Delete workspace
// @Description Delete a workspace by its ID.
// @Tags workspaces
// @Produce json
// @Param id path uint true "Workspace ID"
// @Success 200 {object} model.SuccessResponse
// @Failure 400 {object} model.ErrorResponse "Invalid ID"
// @Failure 500 {object} model.ErrorResponse "Unexpected System Error"
// @Router /workspaces/{id} [delete]
func (wc *WorkspaceController) Delete(c *gin.Context) {
	id, err := validationutil.ValidateID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{
			Message: "invalid workspace id",
		})
		return
	}

	err = wc.WorkspaceUsecase.Delete(id)
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
