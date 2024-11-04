import { useRef } from 'react';
import { Plus } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical } from 'lucide-react';
import { FormField } from '../../types/form';
import { useForm } from '../../contexts/FormContext';

// Define the type for the drag item
interface DragItem {
    index: number;
}

const DraggableOption = ({ option, index, moveOption, handleOptionChange }: { option: string, index: number, moveOption: (dragIndex: number, hoverIndex: number) => void, handleOptionChange: (index: number, value: string) => void }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    // const [{ isDragging }, drag] = useDrag<DragItem>({
    //   type: 'FIELD_OPTION_ITEM',
    //   item: { index },
    //   collect: (monitor) => ({
    //     isDragging: monitor.isDragging(),
    //   }),
    // });

    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD_OPTION_ITEM',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop<DragItem>({
        accept: 'FIELD_OPTION_ITEM',
        hover: (item) => {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            // const hoverBoundingRect = ref.current.getBoundingClientRect();
            // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // const clientOffset = monitor.getClientOffset();

            // if (!clientOffset) return;

            // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveOption(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`flex items-center space-x-2 ${isDragging ? 'opacity-50' : ''}`}
        >
            <GripVertical className="cursor-move text-gray-400" size={16} />
            <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder={`Option ${index + 1}`}
            />
        </div>
    );
};



export const FieldOptions = ({ field }: { field: FormField }) => {
    const { updateField } = useForm()
    if (field.type !== 'multiple_choice' && field.type !== 'single_choice') {
        return null;
    }
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = field.options ? [...field.options] : [];
        newOptions[index] = value;
        updateField(field.id, { ...field, options: newOptions });
    };

    const moveOption = (dragIndex: number, hoverIndex: number) => {
        const newOptions = field.options ? [...field.options] : [];
        const dragOption = newOptions[dragIndex];
        newOptions.splice(dragIndex, 1);
        newOptions.splice(hoverIndex, 0, dragOption);
        updateField(field.id, { ...field, options: newOptions });
    };

    const addOption = () => {
        updateField(field.id, {
            ...field,
            options: field.options ? [...field.options, `Option ${field.options.length + 1}`] : []
        });
    };

    return (
        <div className="ml-6 space-y-2 mt-4">
            {(field.options as string[]).map((option, index) => (
                <DraggableOption
                    key={index}
                    option={option}
                    index={index}
                    moveOption={moveOption}
                    handleOptionChange={handleOptionChange}
                />
            ))}
            <button
                onClick={addOption}
                className="text-blue-500 hover:text-blue-600"
            >
                <Plus className="inline-block mr-1" size={16} />
                Add Option
            </button>
        </div>
    );
}
