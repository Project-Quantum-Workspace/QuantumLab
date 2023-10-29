package model

type CreateTableRequest struct {
	TableName      string
	ColumnCount    int
	RowCount       int
	ColumnName     []string
	ColumnDatatype map[string]string
	ColumnData     map[string][]interface{}
}

type ResultRepository interface {
	Create(table *CreateTableRequest, token string) error
	CheckToken(token string) (bool, error)
}

type ResultUsecase interface {
	Create(table *CreateTableRequest, token string) error
	CheckToken(token string) (bool, error)
}
