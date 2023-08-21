package model

type User struct {
	ID              uint        `json:"id"`
	UUID            string      `json:"uuid"`
	Email           string      `json:"email"`
	Password        string      `json:"password"`
	AccountStatus   bool        `json:"accountStatus"`
	AccessLevel     uint        `json:"accessLevel"`
	QuantumlabToken string      `json:"quantumlabToken"`
	Avatar          string      `json:"avatar"`
	Roles           []Role      `json:"roles" gorm:"many2many:user_roles;"`
	Workspaces      []Workspace `json:"workspaces" gorm:"many2many:user_workspaces;"`
}

// for the list item that contains less user information
type UserListItem struct {
	ID            uint   `json:"id"`
	UUID          string `json:"uuid"`
	Email         string `json:"email"`
	AccountStatus bool   `json:"accountStatus"`
	Roles         []Role `json:"roles" gorm:"many2many:user_roles;joinForeignKey:user_id"`
	AccessLevel   uint   `json:"accessLevel"`
}

type UserAdminUsecase interface {
	InviteUsers(
		emailList []string,
		emailServer string,
		from string,
		secret string,
	) error
	GetUserList() ([]UserListItem, error)
	GetUserDetail(id uint) (User, error)
	UpdateUser(user User) error
}

type UserRepository interface {
	CreateBatch(users []User) error
	GetByEmail(email string) (User, error)
	GetByID(id uint) (User, error)
	GetAll() ([]UserListItem, error)
	Update(user User) error
}
