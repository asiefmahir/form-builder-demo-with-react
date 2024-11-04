import { Type, Calendar, CheckSquare, List, LucideIcon, Undo2, Redo2 } from 'lucide-react'
import FormField from './FormField'
import { useForm } from '../contexts/FormContext';
import { useDrop } from 'react-dnd';
import DraggableOption from './DraggableOption';
import { FormField as FormFieldTypes } from '../types/form';
import React from 'react';

interface FieldOption {
    icon: LucideIcon;
    label: string;
    type: FormFieldTypes['type'];
    color: string;
}

const FormBuilder: React.FC = () => {
    const { formFields, addField, undo, redo, canUndo, canRedo } = useForm();

    const [fieldOptions] = React.useState<FieldOption[]>([
        { type: 'text', icon: Type, label: 'Text Field', color: 'blue' },
        { type: 'date', icon: Calendar, label: 'Date Field', color: 'purple' },
        { type: 'single_choice', icon: List, label: 'Single Choice', color: 'green' },
        { type: 'multiple_choice', icon: CheckSquare, label: 'Multiple Choice', color: 'orange' },
    ]);

    const [{ isOver }, drop] = useDrop({
        accept: 'FIELD_OPTION',
        drop: (item: { type: FormFieldTypes['type'] }) => addField(item.type),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Form Builder</h2>
                <div className="space-x-2">
                    <button
                        onClick={undo}
                        disabled={!canUndo}
                        title="Undo"
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Undo2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={redo}
                        disabled={!canRedo}
                        title="Redo"
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Redo2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex mb-6 space-x-2 border border-red-200">
                {fieldOptions.map((option) => (
                    <DraggableOption
                        key={option.type}
                        {...option}
                    />
                ))}
            </div>

            <div
                ref={drop}
                data-drop-container
                className={`space-y-4 min-h-[200px] border-2 border-dashed rounded-lg p-4 ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
            >
                {formFields.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        Drag and drop field types here to build your form
                    </div>
                )}
                {formFields.map((field, index) => (
                    <div key={field.id} data-field-item>
                        <FormField
                            field={field}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>


    )
}

export default FormBuilder