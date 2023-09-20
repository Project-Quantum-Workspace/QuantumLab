package middleware

import (
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
)

func JwtAuthenticator(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {

		authToken, err := tokenutil.GetAuthToken(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authenticated!"})
			c.Abort()
			return
		}

		authorization, err := tokenutil.IsAuthenticated(authToken, secret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: "You are not authenticated!"})
			c.Abort()
			return
		}

		if authorization {
			c.Next()
			return
		}

		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Message: err.Error()})
		c.Abort()
	}
}
