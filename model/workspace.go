package model

import (
	"time"
)

type Workspace struct {
	ID           uint
	Name         string
	Type         string
	State        string
	Description  string
	Tags         string
	Parameters   string
	CreatedAt    time.Time
	UpdatedAt    time.Time
	LastAccessed time.Time
	TemplateID   uint `json:"template_id"`
	UserID       uint `json:"user_id"`
}

type UserWorkspaces struct {
	UserID      uint
	WorkspaceID uint
}

type WorkspaceRepository interface {
	Create(workspace *Workspace) error
	GetByID(id uint) (Workspace, error)
	Update(workspace *Workspace) error
	Delete(id uint) error
}

type WorkspaceUsecase interface {
	Create(workspace *Workspace) error
	GetByID(id uint) (Workspace, error)
	Update(workspace *Workspace) error
	Delete(id uint) error
}
