import { LetterText } from "lucide-react";
import { TextArea } from "./input";
import { useFormContext } from "react-hook-form";
import type { FormSchema } from "./form";

export function StepThree() {
	const methods = useFormContext<FormSchema>();

	return (
		<>
			<div className="block">

				<TextArea
                    label="Summarise the loan request"
                    register={methods.register}
                    name="loanRequestSummary"
                    errors={methods.formState.errors}
                    icon={LetterText}
                    placeholder="Describe the loan request"
                />

			</div>

		</>
	);
}
