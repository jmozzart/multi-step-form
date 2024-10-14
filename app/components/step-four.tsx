import { useFormContext } from "react-hook-form";
import { Radio } from "./radio";
import type { FormSchema } from "./form";

export function StepFour() {
	const { register, watch } = useFormContext<FormSchema>();

	const purposeOfTheLoanSelected = watch("purposeOfTheLoan");
	
	return (
		<>
			<div className="w-full grid grid-cols-2 gap-7">
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Acquisition finance"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Acquisition finance"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Asset finance"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Asset finance"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Property purchase"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Property purchase"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Working capital"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Working capital"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Annual review - Existing customer"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Annual review - Existing customer"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Refinance from another bank - New to bank customer"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Refinance from another bank - New to bank customer"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Syndication"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Syndication"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Growth capital"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Growth capital"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Refinance existing bank debt"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Refinance existing bank debt"}
				/>
				<Radio
					register={register}
					name={"purposeOfTheLoan"}
					title={"Other"}
					src={"/other.svg"}
					isChecked={purposeOfTheLoanSelected === "Other"}
				/>
			</div>
		</>
	);
}
