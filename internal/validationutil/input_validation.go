package validationutil

import (
	"errors"
	"fmt"
	"github.com/Project-Quantum-Workspace/QuantumLab/model"
	"regexp"
)

func validateDatatype(dataType map[string]string) error {
	for _, dt := range dataType {
		supportedDatatype := []string{
			"smallint", "integer", "int", "bigint",
			"real", "double precision",
			"^character varying\\(\\d+\\)$", "^varchar\\(\\d+\\)$",
			"^character\\(\\d+\\)$", "^char\\(\\d+\\)$"}
		for _, pattern := range supportedDatatype {
			result, err := regexp.MatchString(pattern, dt)
			if err != nil {
				return err
			}
			if result {
				return nil
			}
		}
	}
	return errors.New("datatype not supported")
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

func validateColumnCount(columnCount int, columnName []string,
	columnDatatype map[string]string, columnData map[string][]string) error {

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

func validateRowCount(rowCount int, columnData map[string][]string) error {
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
	for _, col := range columnName {
		valid, err := regexp.MatchString("^[a-z_]+$", col)
		if err != nil {
			return err
		}
		if !valid {
			return errors.New("invalid column name")
		}
	}
	return nil
}
