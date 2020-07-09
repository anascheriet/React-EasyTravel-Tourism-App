import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react'
import TextInput from '../../app/common/form/TextInput'
import { IUserFormValues } from '../../app/models/User'
import { FORM_ERROR } from 'final-form'
import { combineValidators, isRequired } from 'revalidate'
import { RootStoreContext } from '../../app/stores/rootStore'
import ErrorMessage from '../../app/common/form/ErrorMessage'


const validate = combineValidators({
    email: isRequired('email'),
    displayname: isRequired('displayname'),
    username: isRequired('username'),
    password: isRequired('password')
})

export const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register, user, sudoadminList } = rootStore.userStore;

    let RegisterLabel: string;
    if (user?.status === "SudoAdmin") {
        RegisterLabel = "Add A New Admin"
    }
    else  RegisterLabel = "Sign Up To Easy Travel";
    return (
        <div>
            <FinalForm
                onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
                validate={validate}
                render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                    <Form onSubmit={handleSubmit} error>

                        <Header as='h2' content={RegisterLabel} color='teal'
                            textAlign='center' />

                        <Field name='username' component={TextInput} placeholder='username'></Field>
                        <Field name='displayname' component={TextInput} placeholder='displayname'></Field>
                        <Field name='email' component={TextInput} placeholder='email'></Field>
                        <Field name='password' component={TextInput} placeholder='Password' type='password'></Field>
                        {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}

                        <Button color='teal' fluid disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} content='Register' />

                    </Form>
                )}
            />
        </div>
    )
}

export default RegisterForm;