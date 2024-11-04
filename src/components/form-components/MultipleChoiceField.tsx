
import { Controller, FieldError } from "react-hook-form";
import { Checkbox } from "../ui/Checkbox";
import { IFormFieldProps } from './type';

export const MultipleChoiceField = ({ field, control, error }: IFormFieldProps) => {
    return (
        <Controller
            name={field.id}
            control={control}
            rules={{
                required: field.validation?.required ? 'This field is required' : false,
                validate: (value) => {
                    if (!value || !field.validation) return true;

                    if (field.validation.minSelected && field.validation.maxSelected &&
                        field.validation.minSelected > field.validation.maxSelected) {
                        return 'Invalid selection range configuration';
                    }

                    if (field.validation.minSelected &&
                        field.validation.minSelected > field?.options!.length) {
                        return `Minimum selected cannot be greater than total options (${field?.options!.length})`;
                    }

                    if (field.validation.minSelected && value.length < field.validation.minSelected) {
                        return `Please select at least ${field.validation.minSelected} options`;
                    }
                    if (field.validation.maxSelected && value.length > field.validation.maxSelected) {
                        return `Please select no more than ${field.validation.maxSelected} options`;
                    }
                    return true;
                }
            }}
            render={({ field: { onChange, onBlur, value = [] } }) => (
                <div className="space-y-2">
                    {field?.options!.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${field.id}-${index}`}
                                checked={value.includes(option)}

                                onCheckedChange={(checked: boolean) => {
                                    const newValue = checked
                                        ? [...value, option]
                                        : value.filter((v: string) => v !== option);
                                    onChange(newValue);
                                }}
                                onBlur={onBlur}
                            />
                            <label htmlFor={`${field.id}-${index}`} className="text-sm text-gray-700">
                                {option}
                            </label>
                        </div>
                    ))}
                    {error && <p className="text-red-500 text-sm">{error.message as FieldError['message']}</p>}
                </div>
            )}
        />
    );
};

