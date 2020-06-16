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
    password: isRequired('password')
})

export const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <div>
            <FinalForm
                onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
                validate={validate}
                render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                    <Form onSubmit={handleSubmit} error>
                        <Header as='h2' content='Log in to Easy travel' color='teal'
                            textAlign='center' />
                        <Field name='email' component={TextInput} placeholder='email'></Field>
                        <Field name='password' component={TextInput} placeholder='Password' type='password'></Field>
                        {submitError && !dirtySinceLastSubmit && <ErrorMessage text='Invalid email or password'  error={submitError} />}

                        <Button color='teal' fluid disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} content='Login' />

                    </Form>
                )}
            />
        </div>
    )
}
