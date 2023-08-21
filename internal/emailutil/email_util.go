package emailutil

import (
	"net/smtp"
	"os"
	"strings"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"github.com/sirupsen/logrus"
)

func SendInvitation(users []model.User, emailServer string, from string, secret string) {
	bytes, err := os.ReadFile("docs/email_templates/invite_user_template.txt")
	if err != nil {
		logrus.Errorf("error loading template file: %v:", err.Error())
		return
	}

	msgTemplate := string(bytes)
	messages := make(map[string]string)
	for _, user := range users {
		replacer := strings.NewReplacer(
			"[recipient]", user.Email, "[email]", user.Email, "[password]", user.Password)
		msg := replacer.Replace(msgTemplate)
		messages[user.Email] = msg
	}

	sendEmails(emailServer, from, secret, messages)
}

func sendEmails(serverAddr string, from string, password string, messages map[string]string) {
	auth := smtp.PlainAuth("", from, password, "smtp.gmail.com")
	for to, msg := range messages {
		err := sendOne(serverAddr, auth, from, to, msg)
		if err != nil {
			logrus.Errorf("error sending email (from: %v, to: %v): %v", from, to, err.Error())
		}
	}
}

func sendOne(serverAddr string, auth smtp.Auth, from string, to string, msg string) error {
	return smtp.SendMail(serverAddr, auth, from, []string{to}, []byte(msg))
}
