package validationutil

import (
	"errors"
	"fmt"
	"net/mail"
	"regexp"
	"strconv"

	"github.com/Project-Quantum-Workspace/QuantumLab/model"
)

// validate the auto increment ID
func ValidateID(str string) (uint, error) {
	id, err := strconv.Atoi(str)
	if err != nil {
		return 0, err
	}
	if id <= 0 {
		return 0, errors.New("invalid id")
	}
	return uint(id), nil
}

// validate email address
func ValidateEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func ValidateTableCreationRequest(table *model.CreateTableRequest) error {
	columnCheck := validateColumnCount(table.ColumnCount, table.ColumnName,
		table.ColumnDatatype, table.ColumnData)
	if columnCheck != nil {
		return columnCheck
	}
	rowCheck := validateRowCount(table.RowCount, table.ColumnData)
	if rowCheck != nil {
		return rowCheck
	}
	tableNameCheck := validateTableName(table.TableName)
	if tableNameCheck != nil {
		return tableNameCheck
	}
	columnNameCheck := validateColumnName(table.ColumnName)
	if columnNameCheck != nil {
		return columnNameCheck
	}
	dataTypeCheck := validateDatatype(table.ColumnDatatype)
	if dataTypeCheck != nil {
		return dataTypeCheck
	}
	return nil
}

func validateDatatype(dataType map[string]string) error {
	patterns := []string{
		"^smallint$", "^integer$", "^int$", "^bigint$",
		"^real$", "^double precision$",
		"^character varying\\(\\d+\\)$", "^varchar\\(\\d+\\)$",
		"^character\\(\\d+\\)$", "^char\\(\\d+\\)$"}
	var compiledPatterns []*regexp.Regexp
	for _, p := range patterns {
		re, err := regexp.Compile(p)
		if err != nil {
			return err
		}
		compiledPatterns = append(compiledPatterns, re)
	}
	valid := false
	for key, value := range dataType {
		valid = false
		for _, cp := range compiledPatterns {
			if cp.MatchString(value) {
				valid = true
				break
			}
		}
		if !valid {
			errorMessage := fmt.Sprintf("data type %s in column %s not supported", value, key)
			return errors.New(errorMessage)
		}
	}
	return nil
}

func validateColumnCount(columnCount int, columnName []string,
	columnDatatype map[string]string, columnData map[string][]interface{}) error {

	if len(columnName) != columnCount {
		errorMessage := fmt.Sprintf("column number is %d, but received %d column names",
			columnCount, len(columnName))
		return errors.New(errorMessage)
	} else if len(columnDatatype) != columnCount {
		errorMessage := fmt.Sprintf("column number is %d, but received %d column datatypes",
			columnCount, len(columnDatatype))
		return errors.New(errorMessage)
	} else if len(columnData) != columnCount {
		errorMessage := fmt.Sprintf("column number is %d, but received %d column data",
			columnCount, len(columnDatatype))
		return errors.New(errorMessage)
	}
	return nil
}

func validateRowCount(rowCount int, columnData map[string][]interface{}) error {
	for key, value := range columnData {
		if len(value) != rowCount {
			errorMessage := fmt.Sprintf("row number is %d, but received %d rows of data in %s column",
				rowCount, len(value), key)
			return errors.New(errorMessage)
		}
	}
	return nil
}

func validateTableName(tableName string) error {
	valid, err := regexp.MatchString("^[a-z0-9_]+$", tableName)
	if err != nil {
		return err
	}
	if !valid {
		return errors.New("invalid table name")
	}
	return nil
}

func validateColumnName(columnName []string) error {
	cp, err := regexp.Compile("^[a-z0-9_]+$")
	if err != nil {
		return err
	}
	for _, col := range columnName {
		if !cp.MatchString(col) {
			errorMessage := fmt.Sprintf("invalid column name %s", col)
			return errors.New(errorMessage)
		}
	}
	return nil
}
