package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewJobMonitorRoute(apiRouterGroup *gin.RouterGroup, db *gorm.DB, env *bootstrap.Env) {
	jmr := repository.NewJobMonitorRepository(db)
	jmc := &controller.JobMonitorController{
		JobMonitorUsecase: usecase.NewJobMonitorUsecase(jmr),
		Env:               env,
	}

	userTokenRouterGroup := apiRouterGroup.Group("/job")
	userTokenRouterGroup.GET("/list", jmc.GetJobList)
}
