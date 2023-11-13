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
	qlDB  *gorm.DB
}

func NewResultRepository(qlRDB *gorm.DB, qlDB *gorm.DB) model.ResultRepository {
	return &resultRepository{
		qlRDB: qlRDB,
		qlDB:  qlDB,
	}
}

func (repo *resultRepository) CheckToken(token string) (bool, error) {
	var users []model.User
	err := repo.qlDB.Table("users").Where("quantumlab_token = ?", token).Find(&users)
	return len(users) == 1, err.Error
}

func (repo *resultRepository) Create(table *model.CreateTableRequest, token string) error {
	tableName := table.TableName + "_" + token
	createTableSQL := "CREATE TABLE " + tableName + " ("
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
	intCheck := func(dt string) bool {
		return dt == "smallint" ||
			dt == "integer" ||
			dt == "int" ||
			dt == "bigint"
	}
	floatCheck := func(dt string) bool {
		return dt == "real" ||
			dt == "double precision"
	}
	stringCheck := func(dt string) bool {
		patterns := []string{
			"^character varying\\(\\d+\\)$", "^varchar\\(\\d+\\)$",
			"^character\\(\\d+\\)$", "^char\\(\\d+\\)$"}
		var compiledPatterns []*regexp.Regexp
		for _, p := range patterns {
			re, err := regexp.Compile(p)
			if err != nil {
				return false
			}
			compiledPatterns = append(compiledPatterns, re)
		}
		for _, cp := range compiledPatterns {
			if cp.MatchString(dt) {
				return true
			}
		}
		return false
	}

	for i < table.RowCount {
		insertDataSQL = "INSERT INTO " + tableName + " ("
		for j, col := range table.ColumnName {
			insertDataSQL += col
			if j < table.ColumnCount-1 {
				insertDataSQL += " ,"
			}
		}
		insertDataSQL += ") VALUES ("
		var args []interface{}
		for j, col := range table.ColumnName {
			dataType := table.ColumnDatatype[col]
			insertDataSQL += "?"
			if j < table.ColumnCount-1 {
				insertDataSQL += " ,"
			}
			if stringCheck(dataType) {
				if data, ok := table.ColumnData[col][i].(string); ok {
					args = append(args, data)
				} else {
					dropTableSQL := fmt.Sprintf("DROP TABLE %s", table.TableName)
					repo.qlRDB.Exec(dropTableSQL)
					return errors.New("data type is inconsistent as claimed")
				}
			} else if intCheck(dataType) {
				args = append(args, int(table.ColumnData[col][i].(float64)))
			} else if floatCheck(dataType) {
				args = append(args, table.ColumnData[col][i].(float64))
			}
		}
		insertDataSQL += ");"
		result = repo.qlRDB.Exec(insertDataSQL, args...)
		if result.Error != nil {
			dropTableSQL := fmt.Sprintf("DROP TABLE %s", tableName)
			repo.qlRDB.Exec(dropTableSQL)
			return result.Error
		}
		i += 1
	}
	return nil
}
