// Code generated by swaggo/swag. DO NOT EDIT.

package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "Quanchi Chen",
            "email": "quanchic@student.unimelb.edu.au"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/auth/login": {
            "post": {
                "description": "Log a user in if the provided email and password are correct.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Log a user in",
                "parameters": [
                    {
                        "description": "login credential",
                        "name": "credential",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.LoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.LoginResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request (Invalid Email)",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "401": {
                        "description": "Incorrect Password",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Email Not Found",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Error Creating Access/Refresh Token",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/templates": {
            "get": {
                "description": "Get all workspace templates.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "templates"
                ],
                "summary": "Get all templates",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Template"
                            }
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            },
            "post": {
                "description": "Create a new workspace template.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "templates"
                ],
                "summary": "Create new template",
                "parameters": [
                    {
                        "description": "Data needed for creating a workspace template",
                        "name": "template",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.Template"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Request Parse Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/templates/{id}": {
            "put": {
                "description": "Update an existing workspace template.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "templates"
                ],
                "summary": "Update template",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Template ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Updated template data",
                        "name": "template",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.Template"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Request Parse Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete a workspace template.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "templates"
                ],
                "summary": "Delete template",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Template ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Request Parse Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/workspaces": {
            "post": {
                "description": "Create a workspace.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "workspaces"
                ],
                "summary": "Create workspace",
                "parameters": [
                    {
                        "description": "New workspace with the ID of owner",
                        "name": "workspace",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.Workspace"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Request Parse Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/workspaces/users/{id}": {
            "get": {
                "description": "Get all workspaces of a user. An empty array is returned if the user has no workspace.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "workspaces"
                ],
                "summary": "Get all workspaces by user",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "User ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Workspace"
                            }
                        }
                    },
                    "400": {
                        "description": "Illegal User ID",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/workspaces/{id}": {
            "get": {
                "description": "Get a workspace by its ID.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "workspaces"
                ],
                "summary": "Get workspace by ID",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Workspace ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Workspace"
                        }
                    },
                    "400": {
                        "description": "Illegal Workspace ID",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Workspace Not Found",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete a workspace by its ID.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "workspaces"
                ],
                "summary": "Delete workspace",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Workspace ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Illegal Workspace ID",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            },
            "patch": {
                "description": "Update specific fields of a workspace.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "workspaces"
                ],
                "summary": "Update workspace",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Workspace ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Updated workspace metadata",
                        "name": "workspace",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.Workspace"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.SuccessResponse"
                        }
                    },
                    "400": {
                        "description": "Request Parse Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Database Query Error",
                        "schema": {
                            "$ref": "#/definitions/model.ErrorResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.ErrorResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "model.LoginRequest": {
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "model.LoginResponse": {
            "type": "object",
            "properties": {
                "accessToken": {
                    "type": "string"
                },
                "refreshToken": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "model.SuccessResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "model.Template": {
            "type": "object",
            "properties": {
                "accessLevel": {
                    "type": "string"
                },
                "filename": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "parameters": {
                    "type": "string"
                }
            }
        },
        "model.User": {
            "type": "object",
            "properties": {
                "accessLevel": {
                    "type": "integer"
                },
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "password": {
                    "type": "string"
                },
                "quantumlabToken": {
                    "type": "string"
                },
                "workspaces": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.Workspace"
                    }
                }
            }
        },
        "model.Workspace": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "lastAccessed": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "parameters": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "tags": {
                    "type": "string"
                },
                "template": {
                    "$ref": "#/definitions/model.Template"
                },
                "templateId": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "users": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.User"
                    }
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "",
	BasePath:         "/api",
	Schemes:          []string{},
	Title:            "QuantumLab Gin Web Service",
	Description:      "A web service API in Go using the Gin framework",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
