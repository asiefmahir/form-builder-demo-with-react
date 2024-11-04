import {
	Control,
	Merge,
	FieldError,
	FieldValues,
	FieldErrorsImpl,
} from "react-hook-form";

import { FormField } from "../../types/form";

export interface IFormFieldProps {
	field: FormField;
	control: Control;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}
