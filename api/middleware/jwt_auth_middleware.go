package middleware

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

func JwtAuthenticator(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authToken, err := tokenutil.GetAuthToken(c)
		if err == nil {
			authorization, err := tokenutil.IsAuthorized(authToken, secret)
			if authorization {
				c.Next()
				return
			}
			c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: err.Error()})
			c.Abort()
			return
		}
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authorized!"})
		c.Abort()
	}
}
