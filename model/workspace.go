package model

import (
	"time"
)

type Workspace struct {
	ID           uint      `json:"id"`
	UUID         string    `json:"uuid"`
	Name         string    `json:"name"`
	Type         string    `json:"type"`
	State        string    `json:"state"`
	Description  string    `json:"description"`
	Tags         string    `json:"tags"`
	Parameters   string    `json:"parameters"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	LastAccessed time.Time `json:"lastAccessed"`
	TemplateID   uint      `json:"templateId"`
	Template     Template  `json:"template"`
}

type UserWorkspace struct {
	UserID      uint `json:"userId"`
	WorkspaceID uint `json:"workspaceId"`
}

type CreateWorkspaceRequest struct {
	Workspace Workspace `json:"workspace"`
	UserUUID  string    `json:"userUuid"`
}

type WorkspaceRepository interface {
	Create(workspace *Workspace, userUUID string) error
	GetAllByUser(userUUID string) ([]Workspace, error)
	GetByUUID(uuid string) (Workspace, error)
	Update(workspace *Workspace, uuid string) error
	Delete(uuid string) error
}

type WorkspaceUsecase interface {
	Create(workspace *Workspace, userUUID string) error
	GetAllByUser(userUUID string) ([]Workspace, error)
	GetByUUID(uuid string) (Workspace, error)
	Update(workspace *Workspace, uuid string) error
	Delete(uuid string) error
}
