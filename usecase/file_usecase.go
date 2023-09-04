package usecase

import "github.com/Project-Quantum-Workspace/QuantumLab/model"

type fileUsecase struct {
	fileRepository model.FileRepository
}

func NewFileUsecase(fileRepository model.FileRepository) model.FileUsecase {
	return &fileUsecase{
		fileRepository: fileRepository,
	}
}

func (usecase *fileUsecase) Create(file *model.File) error {
	return usecase.fileRepository.Create(file)
}

func (usecase *fileUsecase) GetByID(id uint) (model.File, error) {
	return usecase.fileRepository.GetByID(id)
}
