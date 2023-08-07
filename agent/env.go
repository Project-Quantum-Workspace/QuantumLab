package main

import (
	"github.com/spf13/viper"
	"log"
)

type Env struct {
	Protocol       string `mapstructure:"protocol"`
	QuantumLabHost string `mapstructure:"quantumlab_host"`
	QuantumLabPort string `mapstructure:"quantumlab_port"`
}

func newEnv() *Env {
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalln("File .env Not Found")
	}

	env := Env{}

	err = viper.Unmarshal(&env)
	if err != nil {
		log.Fatal("Environment Variables Loaded Unsuccessfully")
	}

	return &env
}
