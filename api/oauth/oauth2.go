package oauth

import (
	"fmt"
	"net/http"

	"github.com/Project-Quantum-Workspace/QuantumLab/bootstrap"
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/tokenutil"
	"github.com/sirupsen/logrus"
	"gopkg.in/oauth2.v3/errors"
	"gopkg.in/oauth2.v3/manage"
	"gopkg.in/oauth2.v3/models"
	"gopkg.in/oauth2.v3/server"
	"gopkg.in/oauth2.v3/store"
)

func NewOAuthServer(env *bootstrap.Env) *server.Server {
	manager := manage.NewDefaultManager()
	// token memory store
	manager.MustTokenStorage(store.NewMemoryTokenStore())

	// client memory store
	clientStore := store.NewClientStore()
	err := clientStore.Set(env.OAuthClientID, &models.Client{
		ID:     env.OAuthClientID,
		Secret: env.OAuthClientSecret,
		Domain: env.OAuthClientDomain,
	})
	if err != nil {
		logrus.Errorf("error setting up oauth server: %v", err)
		return nil
	}
	manager.MapClientStorage(clientStore)

	srv := server.NewDefaultServer(manager)
	srv.SetAllowGetAccessRequest(true)
	srv.SetClientInfoHandler(server.ClientFormHandler)

	srv.SetUserAuthorizationHandler(func(w http.ResponseWriter, r *http.Request) (userID string, err error) {
		authCookie, err := r.Cookie("auth")
		if err != nil {
			logrus.Errorf("%v", err.Error())
			return
		}
		uid, err := tokenutil.ExtractUserIDFromToken(authCookie.Value, env.AccessJWTSecret)
		logrus.Errorf("%v", err.Error())
		userID = fmt.Sprintf("%v", uid)
		return
	})

	srv.SetInternalErrorHandler(func(err error) (res *errors.Response) {
		logrus.Errorf("Internal Error: %v", err.Error())
		return
	})

	srv.SetResponseErrorHandler(func(res *errors.Response) {
		logrus.Errorf("Response Error: %v", res.Error.Error())
	})

	return srv
}
