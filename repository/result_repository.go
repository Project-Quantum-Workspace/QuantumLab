package repository

import (
	"fmt"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
)

type resultRepository struct {
	qlRDB *gorm.DB
}

func NewResultRepository(qlDB *gorm.DB) model.ResultRepository {
	return &resultRepository{
		qlRDB: qlDB,
	}
}

func (repo *resultRepository) Create(table *model.CreateTableRequest) error {
	createTableSQL := "CREATE TABLE " + table.TableName + " ("
	for i, col := range table.ColumnName {
		createTableSQL += col + " " + table.ColumnDatatype[col]
		if i < table.ColumnCount-1 {
			createTableSQL += ","
		}
	}
	createTableSQL += ");"
	result := repo.qlRDB.Exec(createTableSQL)
	if result.Error != nil {
		return result.Error
	}
	i := 0
	insertDataSQL := ""
	for i < table.RowCount {
		insertDataSQL = "INSERT INTO " + table.TableName + " ("
		for j, col := range table.ColumnName {
			insertDataSQL += col
			if j < table.ColumnCount-1 {
				insertDataSQL += " ,"
			}
		}
		insertDataSQL += ") VALUES ("
		for j, col := range table.ColumnName {
			if table.ColumnDatatype[col] == "character varying(255)" {
				insertDataSQL += `'` + table.ColumnData[col][i] + `'`
			} else {
				insertDataSQL += table.ColumnData[col][i]
			}
			if j < table.ColumnCount-1 {
				insertDataSQL += " ,"
			}
		}
		insertDataSQL += ");"
		result = repo.qlRDB.Exec(insertDataSQL)
		if result.Error != nil {
			fmt.Println(insertDataSQL)
			return result.Error
		}
		i += 1
	}
	return nil
}
