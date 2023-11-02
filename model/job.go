package model

type JobMonitorUsecase interface {
	GetUserIBMToken(userID uint) (Token, error)
}

type JobMonitorRepository interface {
	GetUserIBMToken(uid uint) (Token, error)
}
