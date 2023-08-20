package model

type CreateTableRequest struct {
	TableName      string
	ColumnCount    int
	RowCount       int
	ColumnName     []string
	ColumnDatatype map[string]string
	ColumnData     map[string][]string
}

type ResultRepository interface {
	Create(table *CreateTableRequest) error
}

type ResultUsecase interface {
	Create(table *CreateTableRequest) error
}
