package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewTemplateRouter(env *bootstrap.Env, db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	repo := repository.NewTemplateRepository(db)

	templateController := controller.TemplateController{
		TemplateUsecase: usecase.NewTemplateUsecase(repo),
		Env:             env,
	}

	apiRouterGroup.GET("/templates", templateController.GetAllTemplates)
	apiRouterGroup.GET("/templates/:id",templateController.GetTemplateByID)
	apiRouterGroup.POST("/templates", templateController.PostOneTemplate)
	apiRouterGroup.PUT("/templates/:id", templateController.UpdateOneTemplate)
	apiRouterGroup.DELETE("/templates/:id", templateController.DeleteTemplate)
	apiRouterGroup.GET("/templates/icons", templateController.GetPresetIconList)
}
