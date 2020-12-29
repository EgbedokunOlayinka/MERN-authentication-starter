import React, { useEffect } from "react";
import { withFormik, Form } from "formik";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  Box,
  useColorModeValue,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  Link,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { BsFillPersonFill } from "react-icons/bs";
import CustomInput from "../components/CustomInput";
import { userRegister, clearError } from "../redux/user/user.actions";

const RegisterPage = ({
  values,
  errors,
  isSubmitting,
  history,
  error,
  loading,
  userInfo,
  userRegister,
  clearError,
}) => {
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const bg = useColorModeValue("white", "bgRight");
  const firstText = useColorModeValue("customBlack", "customWhite");

  return (
    <Center fontFamily="body" w="100%" h="100vh" bg={bg}>
      <Box
        w="100%"
        maxW="28rem"
        border={[null, "1px"]}
        borderColor={[null, "customBorder"]}
        borderRadius={[null, "3xl"]}
        p={8}
      >
        <Heading size="md" mb={6}>
          ChatApp
        </Heading>
        <Text fontSize="lg" fontWeight="600" mb={4} color={firstText}>
          Join thousands of people from around the world
        </Text>
        <Text fontSize="md" fontWeight="400" color={firstText}>
          Chat with friends, join channels, have wide-ranging conversations, and
          generally have fun!!!
        </Text>

        {error && (
          <Alert status="error" mt={4} borderRadius="8px" fontSize="sm">
            <AlertIcon />
            <AlertTitle mr={2} ml={2}>
              {error}
            </AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={(e) => clearError()}
            />
          </Alert>
        )}

        <Form className="page-form">
          <VStack spacing="1rem">
            <CustomInput
              name={"firstname"}
              placeholder={"First name"}
              type={"text"}
              customClass={"input-box"}
              icon={<Icon as={BsFillPersonFill} color="tertiary" />}
            />
            <CustomInput
              name={"lastname"}
              placeholder={"Last name"}
              type={"text"}
              customClass={"input-box"}
              icon={<Icon as={BsFillPersonFill} color="tertiary" />}
            />
            <CustomInput
              name={"email"}
              placeholder={"Email"}
              type={"email"}
              customClass={"input-box"}
              icon={<EmailIcon color="tertiary" />}
            />
            <CustomInput
              name={"password"}
              placeholder={"Password"}
              type={"password"}
              customClass={"input-box"}
              icon={<LockIcon color="tertiary" />}
            />
          </VStack>

          <Button
            type="submit"
            bg="customBlue"
            color="white"
            fontFamily="body"
            fontSize="1rem"
            fontWeight="600"
            w="100%"
            mt={6}
            _hover={{ opacity: 0.8 }}
            isLoading={loading}
          >
            Submit
          </Button>
        </Form>

        <Text align="center" fontSize="sm" color="tertiary" mt={6}>
          Have an account already?{" "}
          <Link as={RouterLink} to="/login" color="customBlue">
            Login
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

const FormikRegisterPage = withFormik({
  mapPropsToValues({ firstname, lastname, email, password }) {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    props.userRegister(
      values.firstname,
      values.lastname,
      values.email,
      values.password
    );
    resetForm();
    setSubmitting(false);
  },
})(RegisterPage);

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.loading,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, { userRegister, clearError })(
  FormikRegisterPage
);
