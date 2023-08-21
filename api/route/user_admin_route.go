package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewUserAdminRouter(env *bootstrap.Env, db *gorm.DB, apiRouterGroup *gin.RouterGroup) {
	ur := repository.NewUserRepository(db)
	rr := repository.NewRoleRepository(db)
	uac := controller.UserAdminController{
		Env:              env,
		UserAdminUsecase: usecase.NewUserAdminUsecase(ur, rr),
	}

	userAdminRouterGroup := apiRouterGroup.Group("/admin/users")
	userAdminRouterGroup.POST("/invite", uac.InviteUsers)
	userAdminRouterGroup.GET("", uac.GetUserList)
	userAdminRouterGroup.GET("/:id", uac.GetUserDetail)
	userAdminRouterGroup.PUT("/:id", uac.UpdateUser)
}
