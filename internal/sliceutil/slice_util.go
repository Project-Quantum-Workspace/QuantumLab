package sliceutil

func RemoveDuplicates(list []string) []string {
	seen := make(map[string]bool)
	var set []string
	for _, item := range list {
		_, exists := seen[item]
		if !exists {
			seen[item] = true
			set = append(set, item)
		}
	}
	return set
}

func RemoveSubset(set []string, remove []string) []string {
	removeMap := make(map[string]bool)
	for _, elem := range remove {
		removeMap[elem] = true
	}
	var newSet []string
	for _, elem := range set {
		_, exists := removeMap[elem]
		if !exists {
			newSet = append(newSet, elem)
		}
	}
	return newSet
}
