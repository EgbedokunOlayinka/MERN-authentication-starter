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
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import CustomInput from "../components/CustomInput";
import { userLogin, clearError } from "../redux/user/user.actions";

const LoginPage = ({
  values,
  errors,
  clearError,
  error,
  loading,
  userInfo,
  history,
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
        <Text fontSize="lg" fontWeight="600" color={firstText}>
          Login
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
          Don't have an account?{" "}
          <Link as={RouterLink} to="/register" color="customBlue">
            Register
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

const FormikLoginPage = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    props.userLogin(values.email, values.password);
  },
})(LoginPage);

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.loading,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, { userLogin, clearError })(
  FormikLoginPage
);
