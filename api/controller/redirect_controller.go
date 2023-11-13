package controller

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/gin-gonic/gin"
)

type RedirectController struct {
	Env *bootstrap.Env
}

func (rc *RedirectController) RedirectSuperset(c *gin.Context) {
	c.Redirect(http.StatusFound, rc.Env.SupersetURL)
}
