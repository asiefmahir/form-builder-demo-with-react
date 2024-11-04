import { useForm } from "../../contexts/FormContext";
import { FormField } from "../../types/form";

export const FieldValidation = ({ field, }: { field: FormField }) => {
    const { updateField } = useForm()
    const toggleRequired = () => {
        updateField(field.id, {
            ...field,
            validation: {
                ...field.validation,
                required: !field.validation?.required
            }
        });
    };

    const handleDateValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newValidation = {
            ...field.validation,
            [name]: value
        };

        if (name === 'minDate' && newValidation.maxDate &&
            new Date(value) > new Date(newValidation.maxDate)) {
            alert("Minimum date cannot be after maximum date");
            return;
        }

        if (name === 'maxDate' && newValidation.minDate &&
            new Date(newValidation.minDate) > new Date(value)) {
            alert("Maximum date cannot be before minimum date");
            return;
        }

        updateField(field.id, {
            ...field,
            validation: newValidation
        });
    };

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name: fieldName, value } = e.target;
        const parsedValue = parseInt(value) || 0;

        updateField(field.id, {
            ...field,
            validation: {
                ...field.validation,
                [fieldName]: parsedValue > 0 ? parsedValue : undefined
            }
        });
    };

    const validateLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name: fieldName, value } = e.target;
        const parsedValue = parseInt(value) || 0;
        const newValidation = {
            ...field.validation,
            [fieldName]: parsedValue > 0 ? parsedValue : undefined
        };

        if (fieldName === 'minLength' && newValidation.maxLength &&
            parsedValue > newValidation.maxLength) {
            alert("Minimum length cannot be greater than maximum length");
            return;
        }

        if (fieldName === 'maxLength' && newValidation.minLength &&
            newValidation.minLength > parsedValue) {
            alert("Maximum length cannot be less than minimum length");
            return;
        }

        updateField(field.id, {
            ...field,
            validation: newValidation
        });
    };

    return (
        <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={field.validation?.required || false}
                        onChange={toggleRequired}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-600">Required field</span>
            </div>

            {field.type === 'text' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Min Length</label>
                        <input
                            type="number"
                            min="0"
                            name="minLength"
                            value={field.validation?.minLength || ''}
                            onChange={handleLengthChange}
                            onBlur={validateLength}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Max Length</label>
                        <input
                            type="number"
                            min="0"
                            name="maxLength"
                            value={field.validation?.maxLength || ''}
                            onChange={handleLengthChange}
                            onBlur={validateLength}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}

            {field.type === 'date' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Min Date</label>
                        <input
                            type="date"
                            name="minDate"
                            value={field.validation?.minDate || ''}
                            onChange={handleDateValidation}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Max Date</label>
                        <input
                            type="date"
                            name="maxDate"
                            value={field.validation?.maxDate || ''}
                            onChange={handleDateValidation}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};



