package route

import (
	"QuantumLab/api/controller"
	"QuantumLab/bootstrap"
	"QuantumLab/repository"
	"QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewLoginRouter(env *bootstrap.Env, db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	ur := repository.NewUserRepository(db)
	lc := &controller.LoginController{
		LoginUsecase: usecase.NewLoginUC(ur),
		Env:          env,
	}
	apiRouterGroup.POST("/login", lc.Login)
}
