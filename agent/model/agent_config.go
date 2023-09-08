package model

type Metadata struct {
	URL   string
	Token string
}

type Workspace struct {
	Owner string
	ID    string
}

type HealthCheck struct {
	Check               bool
	HealthCheckEndpoint string `yaml:"healthCheckEndpoint"`
	Interval            uint
	Threshold           uint
}

type Tool struct {
	Name        string
	URL         string
	HealthCheck HealthCheck `yaml:"healthCheck"`
	Config      struct{}
}

type Conf struct {
	Metadata  Metadata
	Workspace Workspace
	ToolSet   []Tool `yaml:"toolSet"`
}
