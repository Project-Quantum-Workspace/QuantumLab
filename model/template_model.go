package model


type Template struct {
	Id           int
	Parameters   string
	Access_level string
	File_name    string
}

type TemplateRepository interface {
	Create(template *Template) error
	GetAll()([]Template, error)
	GetByID(id uint) (Template, error)
	Update(template *Template, id uint) error
	Delete(id uint) error
}

type TemplateUsecase interface{
	Create(template *Template) error
	GetAll()([]Template, error)
	GetByID(id uint) (Template, error)
	Update(template *Template, id uint) error
	Delete(id uint) error
}
