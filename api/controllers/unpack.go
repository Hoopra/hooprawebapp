package controllers

import (
	"errors"
	"fmt"

	"hoopraapi/util"
)

func ValidateAndScan(in map[string]interface{}, out interface{}) error {
	err := validate(in, out)
	if err != nil {
		return err
	}
	return util.Object.CopyProperties(in, &out)
}

func validate(in map[string]interface{}, out interface{}) error {
	err, missing := util.Object.Diff(in, out)
	if err != nil {
		return err
	}
	if len(missing) > 0 {
		message := fmt.Sprintf("the following parameters are missing in input: %v", missing)
		return errors.New(message)
	}
	return nil
}
