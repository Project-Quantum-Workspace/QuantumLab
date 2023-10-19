package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewTokenRouter(apiRouterGroup *gin.RouterGroup, db *gorm.DB, env *bootstrap.Env) {
	utr := repository.NewUserTokenRepository(db)
	utc := &controller.UserTokenController{
		UserTokenUsecase: usecase.NewUserTokenUsecase(utr),
		Env:              env,
	}

	userTokenRouterGroup := apiRouterGroup.Group("/token")
	userTokenRouterGroup.GET("/list", utc.GetUserTokens)
	userTokenRouterGroup.POST("/add", utc.AddToken)
	userTokenRouterGroup.PATCH("/edit", utc.EditToken)
	userTokenRouterGroup.DELETE("/remove", utc.RemoveToken)
}
