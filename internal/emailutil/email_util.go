package emailutil

import (
	"os"
	"strings"

	"github.com/sirupsen/logrus"
	"gopkg.in/gomail.v2"
)

func SendUserInvitation(userEmail string, userPassword string,
	host string, port int, from string, secret string,
) error {
	bytes, err := os.ReadFile("docs/email_templates/invite_user_template.html")
	if err != nil {
		logrus.Errorf("error loading email template: %v:", err.Error())
		return err
	}

	emailTemplate := string(bytes)
	replacer := strings.NewReplacer("{email}", userEmail, "{password}", userPassword)
	emailBody := replacer.Replace(emailTemplate)
	err = sendEmail(host, port, from, secret, userEmail,
		"Welcome to QuantumLab!", "text/html", emailBody)
	return err
}

func sendEmail(host string, port int,
	from string, secret string, to string,
	subject string, contentType string, body string,
) error {
	err := send(host, port, from, secret, []string{to}, subject, contentType, body)
	if err != nil {
		logrus.Errorf("error sending email (from: %v, to: %v): %v", from, to, err.Error())
	}
	return err
}

func send(host string, port int,
	from string, secret string, to []string,
	subject string, contentType string, body string,
) error {
	msg := gomail.NewMessage()
	msg.SetHeader("From", from)
	msg.SetHeader("To", to...)
	msg.SetHeader("Subject", subject)
	msg.SetBody(contentType, body)

	dialer := gomail.NewDialer(host, port, from, secret)
	return dialer.DialAndSend(msg)
}
