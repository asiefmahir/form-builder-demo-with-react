import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { LucideIcon } from 'lucide-react';
import { FormField } from '../types/form';

interface DraggableOptionProps {
    type: FormField['type'];
    icon: LucideIcon;
    label: string;
    color: string;
}

const DraggableOption: React.FC<DraggableOptionProps> = ({ type, icon: Icon, label, color }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD_OPTION',
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    drag(ref);

    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-500 hover:bg-blue-600',
        purple: 'bg-purple-500 hover:bg-purple-600',
        green: 'bg-green-500 hover:bg-green-600',
        orange: 'bg-orange-500 hover:bg-orange-600',
    };

    return (
        <div
            ref={ref}
            className={`${colorClasses[color]} cursor-move text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors ${isDragging ? 'opacity-50' : ''
                }`}
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </div>
    );
};

export default DraggableOption;

