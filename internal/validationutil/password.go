package validationutil

import (
	"github.com/alexedwards/argon2id"
	"github.com/sirupsen/logrus"
)

var params = &argon2id.Params{
	Memory:      64 * 1024,
	Iterations:  3,
	Parallelism: 4,
	SaltLength:  16,
	KeyLength:   32,
}

func GenerateHash(password string) (string, error) {
	return argon2id.CreateHash(password, params)
}

func CheckHash(password string, hash string) bool {
	match, err := argon2id.ComparePasswordAndHash(password, hash)
	if err != nil {
		logrus.Error(err)
		return false
	}
	return match
}
