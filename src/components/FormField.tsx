import React, { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { GripVertical } from "lucide-react";
import { FieldControls } from "./field-components/FieldControls";
import { FieldValidation } from "./field-components/FieldValidation";
import { FieldOptions } from "./field-components/FieldOptions";
import { useForm } from "../contexts/FormContext";
import { FormField as FormFieldType } from "../types/form";

interface FormFieldProps {
    field: FormFieldType;
    index: number;
}

const FormField: React.FC<FormFieldProps> = memo(({
    field,
    index,
}) => {
    const { updateField, moveField } = useForm();
    const ref = useRef<HTMLDivElement>(null);

    const [, drag] = useDrag({
        type: "FORM_FIELD",
        item: { index },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });

    const [, drop] = useDrop({
        accept: "FORM_FIELD",
        hover: (item: { index: number }) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            moveField(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    React.useEffect(() => {
        drag(drop(ref));
    }, [drag, drop, ref]);


    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateField(field.id, { ...field, question: e.target.value });
    };

    return (
        <div ref={ref} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
                <GripVertical className="mr-2 cursor-move" size={20} />
                <input
                    type="text"
                    value={field.question}
                    onChange={handleQuestionChange}
                    className="flex-grow p-2 border rounder"
                    placeholder="Enter your question here..."
                />
                <FieldControls field={field} />
            </div>
            <FieldValidation field={field} />
            <FieldOptions field={field} />
        </div>
    );
});

export default FormField;
