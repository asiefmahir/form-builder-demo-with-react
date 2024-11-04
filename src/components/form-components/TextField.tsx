import { Controller, FieldError } from "react-hook-form";

import { IFormFieldProps } from "./type";


export const TextField = ({ field, control, error }: IFormFieldProps) => {
    return (
        <Controller
            name={field.id}
            control={control}
            rules={{
                required: field.validation?.required ? 'This field is required' : false,
                minLength: field.validation?.minLength && {
                    value: field.validation.minLength,
                    message: `Minimum length is ${field.validation.minLength} characters`
                },
                maxLength: field.validation?.maxLength && {
                    value: field.validation.maxLength,
                    message: `Maximum length is ${field.validation.maxLength} characters`
                }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <div>
                    <input
                        type="text"
                        className={`w-full p-2 border rounded ${error ? 'border-green-500' : ''}`}
                        placeholder="Enter your answer"
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error.message as FieldError['message']}</p>}
                </div>
            )}
        />
    );
};
