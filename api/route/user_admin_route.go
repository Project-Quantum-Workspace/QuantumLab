package route

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/api/controller"
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/repository"
	"github.com/Project-Quantum-Workspace/QuantumLab/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewUserAdminRouter(
	apiRouterGroup *gin.RouterGroup,
	db *gorm.DB,
	env *bootstrap.Env,
) {
	ur := repository.NewUserRepository(db)
	rr := repository.NewRoleRepository(db)
	uac := controller.UserAdminController{
		UserAdminUsecase: usecase.NewUserAdminUsecase(ur, rr),
		Env:              env,
	}

	userAdminRouterGroup := apiRouterGroup.Group("/admin/users")
	userAdminRouterGroup.POST("/invite", uac.InviteUsers)
	userAdminRouterGroup.GET("", uac.GetUserList)
	userAdminRouterGroup.GET("/:id", uac.GetUserDetail)
	userAdminRouterGroup.GET("/roles", uac.GetAllRoles)
	userAdminRouterGroup.PUT("/:id", uac.UpdateUser)
	userAdminRouterGroup.PUT("/userStatus", uac.SetUserStatus)
}
