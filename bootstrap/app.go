package bootstrap

import "gorm.io/gorm"

type Application struct {
	Env      *Env
	DB       *gorm.DB
	ResultDB *gorm.DB
}

func App() Application {
	app := &Application{}
	app.Env = NewEnv()
	app.DB = NewPostgresDatabase(app.Env)
	app.ResultDB = NewPostgresResultDatabase(app.Env)
	return *app
}
