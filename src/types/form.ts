export interface FormField {
	id: string;
	type: "text" | "date" | "single_choice" | "multiple_choice";
	question: string;
	options?: string[];
	validation?: {
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		minDate?: string;
		maxDate?: string;
		minSelected?: number;
		maxSelected?: number;
		pattern?: string;
		customValidation?: string;
	};
}

export interface FormData {
	[key: string]: string | string[] | undefined;
}

export interface FormState {
	formFields: FormField[];
	history: FormField[][];
	currentIndex: number;
}

export interface FormContextType {
	formFields: FormField[];
	canUndo: boolean;
	canRedo: boolean;
	undo: () => void;
	redo: () => void;
	addField: (type: FormField["type"]) => void;
	deleteField: (id: string) => void;
	updateField: (id: string, field: FormField) => void;
	moveField: (dragIndex: number, hoverIndex: number) => void;
}
