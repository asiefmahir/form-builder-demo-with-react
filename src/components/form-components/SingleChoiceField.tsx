import { Controller, FieldError } from "react-hook-form";
import { IFormFieldProps } from './type';

export const SingleChoiceField = ({ field, control, error }: IFormFieldProps) => {
    return (
        <Controller
            name={field.id}
            control={control}
            rules={{
                required: field.validation?.required ? 'This field is required' : false
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <div>
                    <div className="space-y-2">
                        {field?.options?.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id={`${field.id}-${index}`}
                                    name={field.id}
                                    value={option}
                                    checked={value === option}
                                    onChange={(e) => onChange(e.target.value)}
                                    onBlur={onBlur}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor={`${field.id}-${index}`} className="text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error.message as FieldError['message']}</p>}
                </div>
            )}
        />
    );
};

