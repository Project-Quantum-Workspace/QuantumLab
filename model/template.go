package model

type Template struct {
	ID          uint
	Parameters  string
	AccessLevel string `json:"access_level"`
	Filename    string
}

type TemplateRepository interface {
	Create(template *Template) error
	GetAll() ([]Template, error)
	GetByID(id uint) (Template, error)
	Update(template *Template, id uint) error
	Delete(id uint) error
}

type TemplateUsecase interface {
	Create(template *Template) error
	GetAll() ([]Template, error)
	GetByID(id uint) (Template, error)
	Update(template *Template, id uint) error
	Delete(id uint) error
}
