package model

import (
	"time"
)

type Workspace struct {
	ID           uint      `json:"id"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	State        string    `json:"state"`
	Description  string    `json:"description"`
	Tags         string    `json:"tags"`
	Parameters   string    `json:"parameters"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	LastAccessed time.Time `json:"last_accessed"`
	TemplateID   uint      `json:"template_id"`
}

type CreateWorkspaceRequest struct {
	Workspace Workspace `json:"workspace"`
	UserID    uint      `json:"user_id"`
}

type UserWorkspaces struct {
	UserID      uint `json:"user_id"`
	WorkspaceID uint `json:"workspace_id"`
}

type WorkspaceRepository interface {
	Create(workspace *Workspace, userID uint) error
	GetAllByUser(userID uint) ([]Workspace, error)
	GetByID(id uint) (Workspace, error)
	Update(workspace *Workspace) error
	Delete(id uint) error
}

type WorkspaceUsecase interface {
	Create(workspace *Workspace, userID uint) error
	GetAllByUser(userID uint) ([]Workspace, error)
	GetByID(id uint) (Workspace, error)
	Update(workspace *Workspace) error
	Delete(id uint) error
}
