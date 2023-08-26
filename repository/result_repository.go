package repository

import (
	"errors"
	"fmt"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
	"regexp"
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
			err := checkDatatype(table.ColumnDatatype[col])
			if err != nil {
				return err
			}
			insertDataSQL += generateValueSQL(table.ColumnDatatype[col],
				table.ColumnData[col][i])
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

func checkDatatype(datatype string) error {
	supportedDatatype := []string{
		"smallint", "integer", "int", "bigint",
		"real", "double precision",
		"^character varying\\(\\d+\\)$", "^varchar\\(\\d+\\)$",
		"^character\\(\\d+\\)$", "^char\\(\\d+\\)$"}
	for _, dt := range supportedDatatype {
		result, err := regexp.MatchString(dt, datatype)
		if err != nil {
			return err
		}
		if result {
			return nil
		}
	}
	return errors.New("datatype not supported")
}

func generateValueSQL(datatype string, data string) string {
	stringDatatype := []string{
		"^character varying\\(\\d+\\)$", "^varchar\\(\\d+\\)$",
		"^character\\(\\d+\\)$", "^char\\(\\d+\\)$"}
	match := false
	result := ""
	for _, dt := range stringDatatype {
		match, _ = regexp.MatchString(dt, datatype)
		if match {
			break
		}
	}
	if match {
		result += `'` + data + `'`
	} else {
		result += data
	}
	return result
}
