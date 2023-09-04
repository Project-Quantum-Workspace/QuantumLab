package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
)

type fileRepository struct {
	db *gorm.DB
}

func NewFileRepository(db *gorm.DB) model.FileRepository {
	return &fileRepository{
		db: db,
	}
}

func (repo *fileRepository) Create(file *model.File) error {
	result := repo.db.Omit("id").Create(&file)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (repo *fileRepository) GetByID(id uint) (model.File, error) {
	var file model.File
	result := repo.db.First(&file, id)
	return file, result.Error
}
