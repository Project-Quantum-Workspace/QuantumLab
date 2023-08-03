package repository

import (

	"github.com/Project-Quantum-Workspace/QuantumLab/model"

	"gorm.io/gorm"
)

type templateRepository struct{
	database *gorm.DB
}

func NewTemplateRepository(db *gorm.DB) model.TemplateRepository{
	return &templateRepository{
		database: db,
	}
}
// create new
func (repo *templateRepository) Create(template *model.Template) error{
	result := repo.database.Create(&template)
	if result.Error != nil{
		return result.Error
	}
	return nil
}
// get all
func (repo *templateRepository) GetAll()([]model.Template,error){
	var templates []model.Template
	result := repo.database.Find(&templates)
	return templates, result.Error
}
// get one template by id
func (repo *templateRepository) GetByID(id uint)(model.Template, error){
	var template model.Template
	result :=repo.database.First(&template,id);
	return template, result.Error
}
//update template by id
func (repo *templateRepository) Update(template *model.Template,id uint) error{
	var findT model.Template
	result :=repo.database.First(&findT,id)
	if result.Error !=nil{
		return result.Error
	}
	res := repo.database.Model(findT).Omit("id").Updates(*template)
	return res.Error
}
// delete template by id
func (repo *templateRepository) Delete(id uint)error{
	var findT model.Template
	result :=repo.database.First(&findT,id)
	if result.Error !=nil{
		return result.Error
	}
	res := repo.database.Delete(&model.Template{},id)
	return res.Error
}