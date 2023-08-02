package route

import (
	"QuantumLab/api/controller"
	"QuantumLab/repository"
	"QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewWorkspaceRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	repo := repository.NewWorkspaceRepository(db)
	controller := controller.WorkspaceController{
		WorkspaceUsecase: usecase.NewWorkspaceUsecase(repo),
	}
	apiRouterGroup.POST("/workspace/create", controller.Create)
	apiRouterGroup.GET("/workspace/:id", controller.GetByID)
	apiRouterGroup.POST("workspace/update", controller.Update)
	apiRouterGroup.POST("workspace/delete/:id", controller.Delete)
}
