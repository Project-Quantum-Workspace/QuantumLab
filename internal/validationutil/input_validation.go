package validationutil

import (
	"errors"
	"strconv"
)

// validate the auto increment ID
func ValidateID(str string) (uint, error) {
	id, err := strconv.Atoi(str)
	if err != nil {
		return 0, err
	}
	if id <= 0 {
		return 0, errors.New("invalid id")
	}
	return uint(id), nil
}
