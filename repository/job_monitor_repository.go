package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
)

type jobMonitorRepository struct {
	qlDB *gorm.DB
}

func NewJobMonitorRepository(db *gorm.DB) model.JobMonitorRepository {
	return &jobMonitorRepository{
		qlDB: db,
	}
}

func (jmr *jobMonitorRepository) GetUserIBMToken(uid uint) (model.Token, error) {
	var userTokens model.Token
	result := jmr.qlDB.Raw(`SELECT * FROM tokens WHERE tokens.user_id = ? AND tokens.name = ?`, uid, "IBM").Scan(&userTokens)
	if result.Error != nil {
		return userTokens, result.Error
	}
	return userTokens, result.Error
}
