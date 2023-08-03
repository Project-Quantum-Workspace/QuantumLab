package route

import (
	"QuantumLab/api/controller"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func TemplateRouter(db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	//route for templates
	tc := &controller.TemplateController{
		TemplateRepo: db,
	}
	apiRouterGroup.GET("/templates", tc.GetAllTemplates)
	apiRouterGroup.POST("/templates", tc.PostOneTemplate)
	apiRouterGroup.PUT("/templates/:id", tc.UpdateOneTemplate)
	apiRouterGroup.DELETE("/templates/:id", tc.DeleteTemplate)

}
