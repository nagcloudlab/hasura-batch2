import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { gql, MutationResult, useMutation } from '@apollo/client';

import {
    SignInMutation,
    SignInMutationVariables,
    useSignInMutation,
} from "../../generated/graphql";


type Props = {}
const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("It should be an email")
        .required("This field is required"),
    password: Yup.string().required("This field is required"),
});



const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(credentials: {email: $email, password: $password}) {
      id
      accessToken
    }
  }
`
const SignIn = (props: Props) => {
    const [signin, { loading }] = useSignInMutation();
    const history = useHistory();
    const signinHandler = ((values: SignInMutationVariables) => {
        signin({ variables: values })
            .then(({ errors, data }) => {
                return errors ? console.error(errors) : userLoggedInHandler(data);
            })
            .catch(console.error);
    })

    const userLoggedInHandler = (data: MutationResult<SignInMutation>["data"]) => {
        if (data?.login) {
            localStorage.setItem("user_token", data.login.accessToken);
            console.log(history)
            history.push(`/profile/${data.login.id}`);
        }
    };
    return (
        <Box width={300} margin="30px auto">
            <Typography variant="h6">Sign In</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signinHandler}
            >
                {({
                    values,
                    touched,
                    errors,
                    isValid,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isInitialValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            error={!!(errors.email && touched.email)}
                            helperText={errors.email && touched.email && errors.email}
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            fullWidth
                            error={!!(errors.password && touched.password)}
                            helperText={
                                errors.password && touched.password && errors.password
                            }
                            margin="normal"
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={!isValid || !!isInitialValid}
                        >
                            Sign In
                        </Button>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default SignIn