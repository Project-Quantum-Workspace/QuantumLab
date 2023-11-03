package repository

import (
	"errors"
	"fmt"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"gorm.io/gorm"
)

type templateRepository struct {
	db *gorm.DB
}

func NewTemplateRepository(db *gorm.DB) model.TemplateRepository {
	db.AutoMigrate(&model.Template{})
	return &templateRepository{
		db: db,
	}
}

// Create creates a new template.
func (repo *templateRepository) Create(template *model.Template) error {
	result := repo.db.Omit("ID").Create(&template)
	if result.Error != nil {
		fmt.Println(result)
		return result.Error
	}
	return nil
}

// GetAll gets all authorised templates.
func (repo *templateRepository) GetAll(accessLevel string) ([]model.Template, error) {
	var templates []model.Template
	fmt.Println(accessLevel)
	result := repo.db.Where("access_level <= ?", accessLevel).Find(&templates)
	fmt.Println(templates)
	return templates, result.Error
}

// GetByID gets a particular template.
func (repo *templateRepository) GetByID(id uint) (model.Template, error) {
	var template model.Template
	result := repo.db.First(&template, id)
	return template, result.Error
}

// Update updates a particular template.
func (repo *templateRepository) Update(template *model.Template, id uint) error {
	var findT model.Template
	result := repo.db.First(&findT, id)
	if result.Error != nil {
		return result.Error
	}
	res := repo.db.Model(findT).Omit("ID").Updates(*template)
	return res.Error
}

// Delete deletes a particular template.
func (repo *templateRepository) Delete(id uint) error {
	var findT model.Template
	result := repo.db.First(&findT, id)
	if result.Error != nil {
		return result.Error
	}
	res := repo.db.Delete(&model.Template{}, id)
	return res.Error
}
func(repo *templateRepository)UploadFile(id uint, file []byte) error{
	var findT model.Template
	res := repo.db.First(&findT, id)
	if res.Error != nil {
		return errors.New("invalid template id")
	}
	res = repo.db.Exec("UPDATE templates SET tf_file = $1 WHERE id = $2", file, id)
	return res.Error
}