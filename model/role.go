package model

type Role struct {
	// declare ID as pointer to let gorm preload the record with id = 0
	// GORM SUCKS!!
	ID   *uint  `json:"id"`
	Name string `json:"name"`
}

type RoleRepository interface {
	GetAll() ([]Role, error)
	GetByName(name string) (*Role, error)
	InitRoles() error
}
