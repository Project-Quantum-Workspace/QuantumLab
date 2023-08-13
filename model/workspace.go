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
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	LastAccessed time.Time `json:"lastAccessed"`
	Icon         string    `json:"icon"`
	TemplateID   uint      `json:"templateId"`
	Template     Template  `json:"template"`
}

type UserWorkspace struct {
	UserID      uint `json:"userId"`
	WorkspaceID uint `json:"workspaceId"`
}

type CreateWorkspaceRequest struct {
	Workspace Workspace `json:"workspace"`
	UserID    uint      `json:"userId"`
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
