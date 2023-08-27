package model

type Role struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type RoleRepository interface {
	GetByName(name string) (Role, error)
}
