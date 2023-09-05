package middleware

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func JwtAuthenticator(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeaders := c.Request.Header.Get("Authorization")
		authTokens := strings.Split(authHeaders, " ")
		if len(authTokens) == 2 {
			token := authTokens[1]
			authorization, err := tokenutil.IsAuthorized(token, secret)
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
