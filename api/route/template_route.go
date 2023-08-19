package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewTemplateRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	//route for templates
	repo := repository.NewTemplateRepository(db)
	tController := controller.TemplateController{
		TemplateUsecase: usecase.NewTemplateUsecase(repo),
	}
	apiRouterGroup.GET("/templates", tController.GetAllTemplates)
	apiRouterGroup.POST("/templates", tController.PostOneTemplate)
	apiRouterGroup.PUT("/templates/:id", tController.UpdateOneTemplate)
	apiRouterGroup.DELETE("/templates/:id", tController.DeleteTemplate)
}
