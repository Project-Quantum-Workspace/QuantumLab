package model

import (
	"time"
)

type File struct {
	ID        string    `json:"id"`
	Hash      string    `json:"hash"`
	CreatedAt time.Time `json:"created_at"`
	CreatedBy string    `json:"created_by"`
	Mimetype  string    `json:"mimetype"`
	Data      []byte    `json:"data"`
}

type FileRepository interface {
	Create(file *File) error
	GetByID(id uint) (File, error)
}

type FileUsecase interface {
	Create(file *File) error
	GetByID(id uint) (File, error)
}
