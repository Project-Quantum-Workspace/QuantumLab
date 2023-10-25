package controller

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
)

type JobMonitorController struct {
	JobMonitorUsecase model.JobMonitorUsecase
	Env               *bootstrap.Env
}

// GetJobList
// @Summary Gets job list from IBMQ based on the user's saved token
// @Description Gets job list from IBMQ based on the logged-in user's saved token
// @Tags token management
// @Accept json
// @Produce json
// @Success 200 {object} []
// @Failure 400 {object} model.ErrorResponse "Bad Request"
// @Failure 500 {object} model.ErrorResponse "Error: Failed to retrieve job lists"
// @Router /api/job/list [get]
func (jmc *JobMonitorController) GetJobList(c *gin.Context) {
	userID, err := tokenutil.ExtractUserID(c, jmc.Env.AccessJWTSecret)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Message: "Bad request (Could not find user)"})
		return
	}

	token, err := jmc.JobMonitorUsecase.GetUserIBMToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error: Failed to retrieve users tokens!"})
		return
	}

	url := "https://runtime-us-east.quantum-computing.ibm.com/jobs"
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error: Failed to retrieve job lists"})
		return
	}
	req.Header.Set("Authorization", "Bearer "+token.Value)

	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error: Failed to retrieve job lists"})
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {

		}
	}(resp.Body)

	for name, values := range resp.Header {
		for _, value := range values {
			c.Writer.Header().Set(name, value)
		}
	}

	c.Writer.WriteHeader(resp.StatusCode)

	if _, err := io.Copy(c.Writer, resp.Body); err != nil {
		// Log the error or handle it as appropriate for your application
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Message: "Error: Failed to retrieve job lists"})
		return
	}
}
