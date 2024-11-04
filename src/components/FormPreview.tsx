import React from 'react';

import { useForm as useFormContext } from '../contexts/FormContext';
import { TextField } from './form-components/TextField';
import { DateField } from './form-components/DateField';
import { SingleChoiceField } from './form-components/SingleChoiceField';
import { MultipleChoiceField } from './form-components/MultipleChoiceField';
import { FormField as FormFieldType } from '../types/form';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, useForm, Control } from 'react-hook-form';

interface FormFieldProps {
    field: FormFieldType;
    control: Control;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>
}

const FormField: React.FC<FormFieldProps> = ({ field, control, error }) => {
    switch (field.type) {
        case 'text':
            return <TextField field={field} control={control} error={error} />;
        case 'date':
            return <DateField field={field} control={control} error={error} />;
        case 'single_choice':
            return <SingleChoiceField field={field} control={control} error={error} />;
        case 'multiple_choice':
            return <MultipleChoiceField field={field} control={control} error={error} />;
        default:
            return null;
    }
};

const FormPreview: React.FC = () => {
    const { formFields } = useFormContext();
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur'
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: Record<string, any>) => {
        console.log(data);

        try {
            const existingResponses = JSON.parse(localStorage.getItem('formResponses') || '[]');
            const responseWithTimestamp = {
                ...data,
                submittedAt: new Date().toISOString(),
            };
            existingResponses.push(responseWithTimestamp);
            localStorage.setItem('formResponses', JSON.stringify(existingResponses));
            console.log(existingResponses);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Form Preview</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {formFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                        <label className="block font-medium">
                            {field.question}
                            {field.validation?.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <FormField
                            field={field}
                            control={control}
                            error={errors[field.id] ?? {} as FieldError}
                        />
                    </div>
                ))}
                {formFields.length > 0 && (
                    <button
                        type="submit"
                        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
};

export default FormPreview;

