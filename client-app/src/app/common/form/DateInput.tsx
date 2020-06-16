import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form } from 'semantic-ui-react'

interface IProps
    extends FieldRenderProps<Date, HTMLElement>, FormFieldProps { }

export const DateInput: React.FC<IProps> = ({
    input,
    width,
    type,
    placeholder,
    meta: { touched, error }
}) => {
    return (
     <div></div>
    )
}
