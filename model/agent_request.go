package model

type AgentRequest struct {
	WorkspaceID     string `json:"workspaceID"`
	WorkspaceOwner  string `json:"workspaceOwner"`
	QuantumlabToken string `json:"quantumlabToken"`
	WorkspaceStatus string `json:"workspaceStatus"`
	Msg             string `json:"msg"`
}

type AgentRequestUsecase interface {
	GetQuantumlabTokenByUUID(uuid string) (string, error)
}
