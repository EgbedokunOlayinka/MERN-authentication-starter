import React from "react";
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { Field } from "formik";

const CustomInput = ({ name, placeholder, type, customClass, icon }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <InputGroup borderRadius="8px" borderColor="customBorder">
              <InputLeftElement pointerEvents="none" children={icon} />
              <Input
                id={name}
                placeholder={placeholder}
                type={type}
                className={customClass}
                {...field}
              />
            </InputGroup>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CustomInput;
