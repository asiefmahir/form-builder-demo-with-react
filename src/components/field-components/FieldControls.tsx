import { Trash2 } from 'lucide-react';
import { FormField } from "../../types/form";
import { useForm } from '../../contexts/FormContext';


export const FieldControls = ({ field }: { field: FormField }) => {
    const { deleteField } = useForm()
    return (
        <Trash2
            className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
            size={20}
            onClick={() => deleteField(field.id)}
        />
    );
};
