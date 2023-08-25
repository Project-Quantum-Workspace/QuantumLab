package model

type Template struct {
	ID          uint   `json:"id"`
	Parameters  string `json:"parameters"`
	AccessLevel string `json:"accessLevel"`
	Filename    string `json:"filename"`
	Icon        string `json:"icon"` // A Base64-encoded string
}

type TemplateRepository interface {
	Create(template *Template) error
	GetAll(accessLevel string) ([]Template, error)
	GetByID(id uint) (Template, error)
	Update(template *Template, id uint) error
	Delete(id uint) error
}

type TemplateUsecase interface {
	Create(template *Template) error
	GetAll(accessLevel string) ([]Template, error)
	GetByID(id uint) (Template, error)
	Update(template *Template, id uint) error
	Delete(id uint) error
}
