//import { Building, Mail, Smartphone, User } from "lucide-react";
import { HandCoins, BadgeDollarSign, LetterText, Percent } from "lucide-react";
import { Input, TextArea } from "./input";
import { useFormContext } from "react-hook-form";
import type { FormSchema } from "./form";
import { maskPhoneNumber } from "../utils/masks";

export function StepTwo() {
	const methods = useFormContext<FormSchema>();

	return (
		<>
			<div className="flex gap-7">

				<Input
					label="Existing debt"
                    register={methods.register}
                    name="existingDebt"
                    errors={methods.formState.errors}
                    icon={HandCoins}
                    placeholder="Existing debt"
                    type="number"
				/>

				<Input
					label="Proposed additional debt"
					register={methods.register}
					name="proposedAdditionalDebt"
					errors={methods.formState.errors}
					icon={BadgeDollarSign}
					placeholder="Proposed additional debt"
                    type="number"
				/>

			</div>

			<div className="flex gap-7">
        
        		<Input 
					label="Estimated interest rate"
					register={methods.register}
					name="estimatedInterestRate"
					errors={methods.formState.errors}
					icon={Percent}
					placeholder="Estimated interest rate"
                    type="number"
				/>

                </div>

            {/* <div className="flex gap-7">

				<TextArea
					label="Summarise the loan request"
					register={methods.register}
					name="loanRequestSummary"
					errors={methods.formState.errors}
					icon={LetterText}
					placeholder="Summarise the loan request"
                    type="text-area"
				/>

			
			</div> */}
		</>
	);
}
