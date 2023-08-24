package repository

import (
	"github.com/Project-Quantum-Workspace/QuantumLab/internal/validationutil"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"gorm.io/gorm"
	"regexp"
	"strconv"
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
	validation := validationutil.ValidateTableCreationRequest(table)
	if validation != nil {
		return validation
	}
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
		insertDataSQL = "INSERT INTO " + table.TableName + " ("
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
				args = append(args, table.ColumnData[col][i])
			} else if intCheck(dataType) {
				data, err := strconv.Atoi(table.ColumnData[col][i])
				if err != nil {
					return err
				}
				args = append(args, data)
			} else if floatCheck(dataType) {
				data, err := strconv.ParseFloat(table.ColumnData[col][i], 64)
				if err != nil {
					return err
				}
				args = append(args, data)
			}
		}
		insertDataSQL += ");"
		result = repo.qlRDB.Exec(insertDataSQL, args...)
		if result.Error != nil {
			return result.Error
		}
		i += 1
	}
	return nil
}
