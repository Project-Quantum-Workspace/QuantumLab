package controller

import (
	"QuantumLab/model"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type WorkspaceController struct {
	WorkspaceUsecase model.WorkspaceUsecase
}

func (controller *WorkspaceController) Create(c *gin.Context) {
	var workspace model.Workspace

	err := c.BindJSON(&workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	// get last accessed timestamp
	workspace.LastAccessed = time.Now()

	err = controller.WorkspaceUsecase.Create(&workspace)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func (controller *WorkspaceController) GetByID(c *gin.Context) {
	var workspace model.Workspace

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	if id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "id must be a positive integer",
		})
		return
	}

	workspace, err = controller.WorkspaceUsecase.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, workspace)
}

func (controller *WorkspaceController) Update(c *gin.Context) {
	var workspace model.Workspace

	err := c.BindJSON(&workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = controller.WorkspaceUsecase.Update(&workspace)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func (controller *WorkspaceController) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	if id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "id must be a positive integer",
		})
		return
	}

	err = controller.WorkspaceUsecase.Delete(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
