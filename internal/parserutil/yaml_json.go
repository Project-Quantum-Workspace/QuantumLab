package parserutil

import (
	"encoding/json"
	"fmt"

	yaml "gopkg.in/yaml.v2"
)

func ConvertMap(input interface{}) interface{} {
	switch v := input.(type) {
	case map[interface{}]interface{}:
		newMap := make(map[string]interface{})
		for k, val := range v {
			newMap[fmt.Sprintf("%v", k)] = ConvertMap(val)
		}
		return newMap
	case []interface{}:
		for i, val := range v {
			v[i] = ConvertMap(val)
		}
	}
	fmt.Print(input)
	return input
}
func YamlToJSON(yamlContent string) (string, error) {
	var obj interface{}

	// Unmarshal the YAML to a Go variable
	if err := yaml.Unmarshal([]byte(yamlContent), &obj); err != nil {
		return "", err
	}

	obj = ConvertMap(obj)

	// Convert the Go variable to JSON
	jsonBytes, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}

	return string(jsonBytes), nil
}
