package yaml_json
import (
	"encoding/json"
	"fmt"

	yaml "gopkg.in/yaml.v2"
)

func convertMap1(input interface{}) interface{} {
	switch v := input.(type) {
	case map[interface{}]interface{}:
		newMap := make(map[string]interface{})
		for k, val := range v {
			newMap[fmt.Sprintf("%v", k)] = convertMap1(val)
		}
		return newMap
	case []interface{}:
		for i, val := range v {
			v[i] = convertMap1(val)
		}
	}
	fmt.Print(input)
	return input
}
func yamlToJSON(yamlContent string) (string, error) {
	var obj interface{}

	// Unmarshal the YAML to a Go variable
	if err := yaml.Unmarshal([]byte(yamlContent), &obj); err != nil {
		return "", err
	}

	obj = convertMap1(obj)

	// Convert the Go variable to JSON
	jsonBytes, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}

	return string(jsonBytes), nil
}
