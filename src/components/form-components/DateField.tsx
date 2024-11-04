import { Controller, FieldError } from "react-hook-form";
import { IFormFieldProps } from './type';

export const DateField = ({ field, control, error }: IFormFieldProps) => {
    return (
        <Controller
            name={field.id}
            control={control}
            rules={{
                required: field.validation?.required ? 'This field is required' : false,
                validate: (value) => {
                    if (!value) return true;
                    if (!field.validation) return true;

                    const date = new Date(value);

                    if (field.validation.minDate && field.validation.maxDate) {
                        const minDate = new Date(field.validation.minDate);
                        const maxDate = new Date(field.validation.maxDate);

                        if (minDate > maxDate) {
                            return 'Invalid date range configuration';
                        }
                    }

                    if (field.validation.minDate) {
                        const minDate = new Date(field.validation.minDate);
                        if (date < minDate) {
                            return `Date must be after ${field.validation.minDate}`;
                        }
                    }

                    if (field.validation.maxDate) {
                        const maxDate = new Date(field.validation.maxDate);
                        if (date > maxDate) {
                            return `Date must be before ${field.validation.maxDate}`;
                        }
                    }

                    return true;
                }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <div>
                    <input
                        type="date"
                        className={`w-full p-2 border rounded ${error ? 'border-green-500' : ''}`}
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        min={field.validation?.minDate || ''}
                        max={field.validation?.maxDate || ''}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error.message as FieldError['message']}</p>}
                </div>
            )}
        />
    );
};

