/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

import { FormContextType, FormField, FormState } from "../types/form";

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialState: FormState = {
    formFields: [],
    history: [],
    currentIndex: -1,
};

type FormAction =
    | { type: "ADD_FIELD"; payload: { field: FormField } }
    | { type: "DELETE_FIELD"; payload: string }
    | { type: "UPDATE_FIELD"; payload: { id: string; field: FormField } }
    | { type: "MOVE_FIELD"; payload: { dragIndex: number; hoverIndex: number } }
    | { type: "UNDO" }
    | { type: "REDO" }

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case "ADD_FIELD": {
            const { field } = action.payload;
            const newFormFields = [...state.formFields, field];

            return {
                ...state,
                formFields: newFormFields,
                history: [...state.history, newFormFields],
                currentIndex: state.currentIndex + 1,
            };
        }

        case "DELETE_FIELD": {
            const newFormFields = state.formFields.filter((field) => field.id !== action.payload);
            return {
                ...state,
                formFields: newFormFields,
                history: [...state.history, newFormFields],
                currentIndex: state.currentIndex + 1,
            };
        }
        case "UPDATE_FIELD": {
            const updatedFormFields = state.formFields.map((field) =>
                field.id === action.payload.id ? action.payload.field : field
            );
            return {
                ...state,
                formFields: updatedFormFields,
                history: [...state.history, updatedFormFields],
                currentIndex: state.currentIndex + 1,
            };

        }

        case "MOVE_FIELD": {
            const { dragIndex, hoverIndex } = action.payload;
            const newFormFields = [...state.formFields];
            const draggedField = newFormFields[dragIndex];
            newFormFields.splice(dragIndex, 1);
            newFormFields.splice(hoverIndex, 0, draggedField);
            return {
                ...state,
                formFields: newFormFields,
                history: [...state.history, newFormFields],
                currentIndex: state.currentIndex + 1,
            };
        }
        case "UNDO": {
            if (state.currentIndex > 0) {
                return {
                    ...state,
                    formFields: state.history[state.currentIndex - 1],
                    currentIndex: state.currentIndex - 1,
                };
            }
            return state;
        }

        case "REDO": {
            if (state.currentIndex < state.history.length - 1) {
                return {
                    ...state,
                    formFields: state.history[state.currentIndex + 1],
                    currentIndex: state.currentIndex + 1,
                };
            }
            return state;
        }

        default:
            return state;
    }
}

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const addField = (type: FormField['type']) => {
        const newField: FormField = {
            id: Date.now().toString(),
            type,
            question: `New ${type} Question`,
            options: type === "single_choice" || type === "multiple_choice" ? ["Option 1"] : [],
            validation: {
                required: false,
            }
        };
        dispatch({ type: "ADD_FIELD", payload: { field: newField } });
    };

    const deleteField = (id: string) => {
        dispatch({ type: "DELETE_FIELD", payload: id });
    };

    const updateField = (id: string, field: FormField) => {
        dispatch({ type: "UPDATE_FIELD", payload: { id, field } });
    };

    const moveField = (dragIndex: number, hoverIndex: number) => {
        dispatch({ type: "MOVE_FIELD", payload: { dragIndex, hoverIndex } });
    };

    const undo = () => {
        dispatch({ type: "UNDO" });
    };

    const redo = () => {
        dispatch({ type: "REDO" });
    };

    return <FormContext.Provider value={{
        formFields: state.formFields,
        canUndo: state.currentIndex > 0,
        canRedo: state.currentIndex < state.history.length - 1,
        undo,
        redo,
        addField,
        deleteField,
        updateField,
        moveField,
    }}>{children}</FormContext.Provider>;
};

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
