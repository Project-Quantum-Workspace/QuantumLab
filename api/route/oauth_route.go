package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/api/oauth"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewOAuthRouter(apiRouterGroup gin.RouterGroup, db *gorm.DB, env *bootstrap.Env) {
	ur := repository.NewUserRepository(db)
	oac := &controller.OAuthController{
		Server:       oauth.NewOAuthServer(env),
		Env:          env,
		LoginUsecase: usecase.NewLoginUC(ur),
	}
	oauthRouterGroup := apiRouterGroup.Group("/oauth")
	oauthRouterGroup.GET("/authorize", gin.WrapF(oac.AuthorizeHandler))
	oauthRouterGroup.POST("/token", gin.WrapF(oac.TokenHandler))
	oauthRouterGroup.GET("/userDetails", oac.GetUserDetails)
}
