package usecase

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
)

type templateUsecase struct {
	templateRepository model.TemplateRepository
}

func NewTemplateUsecase(templateRepository model.TemplateRepository) model.TemplateUsecase {
	return &templateUsecase{
		templateRepository: templateRepository,
	}
}
func (usecase *templateUsecase) Create(template *model.Template) error {
	return usecase.templateRepository.Create(template)
}
func (usecase *templateUsecase) GetAll(accessLevel string) ([]model.Template, error) {
	return usecase.templateRepository.GetAll(accessLevel)
}
func (usecase *templateUsecase) GetByID(id uint) (model.Template, error) {
	return usecase.templateRepository.GetByID(id)
}

func (usecase *templateUsecase) Update(template *model.Template, id uint) error {
	return usecase.templateRepository.Update(template, id)
}

func (usecase *templateUsecase) Delete(id uint) error {
	return usecase.templateRepository.Delete(id)
}
