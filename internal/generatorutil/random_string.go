package generatorutil

import (
	"math/rand"
	"strings"
	"time"
)

const (
	lowerCharSet   = "abcdefghijklmnopqrstuvwxyz"
	upperCharSet   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	specialCharSet = "!@#$%"
	digitSet       = "0123456789"
	letters        = lowerCharSet + upperCharSet
)

func GenerateRandomPassword(length int, minUpperCase int, minSpecialChar int, minDigit int) string {
	// use default parameters if illegal arguments are provided
	if length <= 0 ||
		minUpperCase < 0 || minSpecialChar < 0 || minDigit < 0 ||
		length < minUpperCase+minSpecialChar+minDigit {
		length = 16
		minUpperCase = 2
		minSpecialChar = 2
		minDigit = 2
	}

	s := rand.NewSource(time.Now().UnixNano())
	r := rand.New(s)
	var strBuilder strings.Builder

	for i := 0; i < minUpperCase; i++ {
		random := r.Intn(len(upperCharSet))
		strBuilder.WriteString(string(upperCharSet[random]))
	}

	for i := 0; i < minSpecialChar; i++ {
		random := r.Intn(len(specialCharSet))
		strBuilder.WriteString(string(specialCharSet[random]))
	}

	for i := 0; i < minDigit; i++ {
		random := r.Intn(len(digitSet))
		strBuilder.WriteString(string(digitSet[random]))
	}

	remainingLength := length - minUpperCase - minSpecialChar - minDigit
	allCharSet := lowerCharSet + upperCharSet + specialCharSet + digitSet
	for i := 0; i < remainingLength; i++ {
		random := rand.Intn(len(allCharSet))
		strBuilder.WriteString(string(allCharSet[random]))
	}

	inRune := []rune(strBuilder.String())
	rand.Shuffle(len(inRune), func(i, j int) {
		inRune[i], inRune[j] = inRune[j], inRune[i]
	})

	return string(inRune)
}

func GenerateQuantumLabToken() string {
	s := rand.NewSource(time.Now().UnixNano())
	r := rand.New(s)
	b := make([]byte, 36)

	for i := range b {
		b[i] = letters[r.Intn(len(letters))]
	}
	return "ql_" + string(b)
}
