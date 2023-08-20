package bootstrap

import (
	"github.com/spf13/viper"
	"log"
)

type Env struct {
	AppEnv               string `mapstructure:"APP_ENV"`
	DBHost               string `mapstructure:"DB_HOST"`
	DBPort               string `mapstructure:"DB_PORT"`
	DBUser               string `mapstructure:"DB_USER"`
	DBPass               string `mapstructure:"DB_PASS"`
	DBName               string `mapstructure:"DB_NAME"`
	ResultDBName         string `mapstructure:"RESULT_DB_NAME"`
	AccessJWTSecret      string `mapstructure:"ACCESS_JWT_SECRET"`
	RefreshJWTSecret     string `mapstructure:"REFRESH_JWT_SECRET"`
	AccessJWTExpiryHour  int    `mapstructure:"ACCESS_JWT_EXPIRY_HOUR"`
	RefreshJWTExpiryHour int    `mapstructure:"REFRESH_JWT_EXPIRY_HOUR"`
}

func NewEnv() *Env {
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("File .env Not Found")
	}

	env := Env{}

	err = viper.Unmarshal(&env)
	if err != nil {
		log.Fatal("Environment Variables Loaded Unsuccessfully")
	}

	if env.AppEnv == "development" {
		log.Println("The APP is running in the development environment.")
	}

	return &env
}
