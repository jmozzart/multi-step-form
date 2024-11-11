"use client";

import { z } from "zod";
import { Step } from "./step";
import { useState } from "react";
import { type FieldName, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two-v2";
import { StepThree } from "./step-three-v2";
import { StepFour } from "./step-four";
import { ConditionalComponent, ConditionalComponentProps } from "./step-conditional";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
//import {UploadcareUploader} from "./upload-button";
import BlobUploads from "./vercel-blob-upload";
import axios from "axios";

interface ConditionalComponentMappedProps {
	purpose: string;
	setOfQuestions: ConditionalComponentProps[];
}

const steps = [
	{
		id: 1,
		title: "Business details",
		description: "Please provide details about your business.",
		component: <StepOne />,
		fields: ["companyName", "companyWebsite", "industry", "address"],
	},
	{
		id: 2,
		title: "Loan details",
		description:
			"Please provide details about your existing debt and the proposed additional debt.",
		component: <StepTwo />,
		fields: ["existingDebt", "proposedAdditionalDebt", "estimatedInterestRate"],
	},
	{
		id: 3,
		title: "Summarise the loan request",
		description: "Please provide a summary of your loan request.",
		component: <StepThree />,
		fields: ["loanRequestSummary"],
	},
	{
		id: 4,
		title: "Purpose of the loan",
		description: "Please select the purpose of the loan.",
		component: <StepFour/>,
		fields: ["purposeOfTheLoan"],
	},
	{
		id: 5,
		title: "Additional questions",
		//component: <ConditionalComponent questionLabel="dfsdf" questionName="test" questionPlaceholder="fdjdsljfl" />,
		fields: ["assetType", "assetValue", "priorFinancing", "assetValuationDetails", "assetLife", "purchasePrice", "LTV", "intendedUse", "anticipatedRentalIncome", "maintenanceRequirements", "currentWorkingCapitalNeeds", "currentWorkingCapitalNeedsDetails", "accountsReceivablePayableDetails", "cashConversionCycleDuration", "workingCapitalUsagePlan", "currentTermsOfDebt", "improvementsOrChanges", "purposeOfRefinancing", "penaltiesOrFees", "securityOrCollateral"],
	},
	{
		id: 6,
		title: "Upload your documents",
		description:
			"Please upload any relevant documents that will help us understand your project better.",
		component: <BlobUploads />,
		fields: ["uploadButtonHit", "fileUploads"],

	},
	
	{
		id: 7,
		title: "Submit your quote request",
		description:
			"Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.",
		isLast: true,
	},
];

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(10, "Phone number is required"),
	companyName: z.string().min(1, "Company name is required"),
	companyWebsite: z.string().url("Invalid URL"),
	industry: z.string(),
	address: z.string().min(1, "Address is required"),
	existingDebt: z.coerce.number(),
	proposedAdditionalDebt: z.coerce.number(),
	estimatedInterestRate: z.coerce.number(),
	loanRequestSummary: z.string(),
	purposeOfTheLoan: z.enum([
		"Acquisition finance",
		"Asset finance",
		"Property purchase",
		"Working capital",
		"Annual review - Existing customer",
		"Refinance from another bank - New to bank customer",
		"Syndication",
		"Growth capital",
		"Refinance existing bank debt",
		"Other",
	]),
	assetType: z.string().optional(),
	assetValue: z.string().optional(),
	priorFinancing: z.string().optional(),
	assetValuationDetails: z.string().optional(),
	assetLife: z.string().optional(),
	purchasePrice: z.string().optional(),
	LTV: z.string().optional(),
	intendedUse: z.string().optional(),
	anticipatedRentalIncome: z.string().optional(),
	maintenanceRequirements: z.string().optional(),
	currentWorkingCapitalNeeds: z.string().optional(),
	currentWorkingCapitalNeedsDetails: z.string().optional(),
	accountsReceivablePayableDetails: z.string().optional(),
	cashConversionCycleDuration: z.string().optional(),
	workingCapitalUsagePlan: z.string().optional(),
	currentTermsOfDebt: z.string().optional(),
	improvementsOrChanges: z.string().optional(),
	purposeOfRefinancing: z.string().optional(),
	penaltiesOrFees: z.string().optional(),
	securityOrCollateral: z.string().optional(),
	projectBudgetRange: z.string().optional(),
	uploadButtonHit: z.literal(false).default(false),
 	fileUploads: z.array(z.object({
		fileName: z.string(),
		fileUrl: z.string()
	})).optional()

});

const conditionalQuestions:ConditionalComponentMappedProps[] = [
	{
		purpose: "Asset finance",
		setOfQuestions: [
			{
				questionName: "assetType",
				questionLabel: "What type of asset(s) are you looking to finance?"
			},
			{
				questionName: "assetValue",
				questionLabel: "What is the purchase price of the asset(s)?"
			},
			{
				questionName: "priorFinancing",
				questionLabel: "Do you have any prior financing on similar assets?"
			},
			{
				questionName: "assetValuationDetails",
				questionLabel: "Can you provide asset valuation details (if applicable)?"
			},
			{
				questionName: "assetLife",
				questionLabel: "What is the life of the asset: How long do you intend to use the asset, and what is its expected useful life?"
			}
		]	
	},
	{
		purpose: "Property purchase",
		setOfQuestions: [
			{
				questionName: "purchasePrice",
				questionLabel: "What is the purchase price of the commercial property?"
			},
			{
				questionName: "LTV",
				questionLabel: "What is the expected loan-to-value (LTV) ratio?"
			},
			{
				questionName: "intendedUse",
				questionLabel: "What will be the intended use of the property (e.g., investment, owner-occupied)?"
			},
			{
				questionName: "anticipatedRentalIncome",
				questionLabel: "What is the anticipated rental income, and do you have tenants secured?"
			},
			{
				questionName: "maintenanceRequirements",
				questionLabel: "Are there any expected maintenance or capital expenditure requirements?"
			}
		]
	},
	{
		purpose: "Working capital",
		setOfQuestions: [
			{
				questionName: "currentWorkingCapitalNeeds",
				questionLabel: "What is the purpose of the working capital loan (e.g., inventory, receivables)?"
			},
			{
				questionName: "currentWorkingCapitalNeedsDetails",
				questionLabel: "What are your current working capital needs?"
			},
			{
				questionName: "accountsReceivablePayableDetails",
				questionLabel: "Can you provide details on your accounts receivable and accounts payable cycles?"
			},
			{
				questionName: "cashConversionCycleDuration",
				questionLabel: "What is the average duration of your cash conversion cycle?"
			},
			{
				questionName: "workingCapitalUsagePlan",
				questionLabel: "How do you plan to use the working capital to support business growth?"
			}
		]
	},
	{
		purpose: "Refinance existing bank debt",
		setOfQuestions: [
			{
				questionName: "currentTermsOfDebt",
				questionLabel: "What are the current terms of the debt (interest rate, maturity)?"
			},
			{
				questionName: "improvementsOrChanges",
				questionLabel: "What improvements or changes are you seeking in the refinance (e.g., lower rates, extended terms)?"
			},
			{
				questionName: "purposeOfRefinancing",
				questionLabel: "What is the purpose of refinancing (e.g., reduce costs, improve cash flow)?"
			},
			{
				questionName: "penaltiesOrFees",
				questionLabel: "Are there any penalties or fees for early repayment of the existing loan?"
			},
			{
				questionName: "securityOrCollateral",
				questionLabel: "What is the security or collateral provided under the current facility?"
			}
		]
	}
]

export type FormSchema = z.infer<typeof formSchema>;

export function Form() {
	const [currentStep, setCurrentStep] = useState(0);
	const [conditionalComponent, setConditionalComponent] = useState<ConditionalComponentProps[]>([]);
	//const [invalidGreyOut, setGreyOut] = useState(false)

	const methods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
	});

	// setTimeout( () => {
		const invalidGreyOut = methods.watch("uploadButtonHit")
		
		//console.log("watch isValid", isValid);
//}, 500);
 


	async function onSubmit(data: FormSchema) {
		console.log(data);
		methods.reset();
	}
	
	async function finalSubmit() {
		const data = methods.getValues();

		// axios post request
		console.log("final data", data);
		await axios.post("https://eogsyrgf2tjbnoi.m.pipedream.net", data);
		methods.reset();
		
	}

	async function nextStep() {
		const fields = steps[currentStep].fields;
		const isValid = await methods.trigger(fields as (keyof FormSchema)[], {
			shouldFocus: true,
		});
	/* 	const isValid = await methods.trigger(fields as FieldName<FormSchema>[], {
			shouldFocus: true,
		}); */

		if (!isValid) return;

		if (currentStep <= steps.length - 1) {
			if (currentStep === steps.length - 1) {
				await methods.handleSubmit(onSubmit)();
			}

			if (currentStep < steps.length - 1) {
				setCurrentStep((step) => step + 1);
			}

	
		}

		const values = methods.getValues();
		console.log("currentStep", currentStep);
		const selectedPurpose = values.purposeOfTheLoan;
		console.log("values", values);
	
		const selectedQuestions = conditionalQuestions.find(item => item.purpose === selectedPurpose);
		console.log("selectedQuestions", selectedQuestions);

		if (selectedQuestions) {
			setConditionalComponent(selectedQuestions.setOfQuestions);
		} else {
			setConditionalComponent([]);
			if (currentStep === 3) {
				setCurrentStep((step) => step + 1);
			}
		}

	}

	function previousStep() {
		if (currentStep > 0) {
			setCurrentStep((step) => step - 1);
		}
		console.log("currentStep", currentStep);
		console.log("conditionalComponent", conditionalComponent);

 		if (conditionalComponent.length === 0 && currentStep === 5) {
			setCurrentStep(3);
		} 
	}


	return (
		<div className="mt-6 flex flex-col items-center justify-center gap-3 p-8 text-center">
			<h1 className="text-4xl font-bold text-indigo-950">
				Assess your company's creditworthiness
			</h1>
			<p className="max-w-xl text-zinc-400 text-lg">
				Fill out the form below to access your company's creditworthiness.
			</p>

			<FormProvider {...methods}>
				<form className="flex flex-col gap-7 max-w-[698px] h-auto min-h-[800px]">
					<section className="h-full mt-8 flex flex-col gap-4 shadow-sm border-zinc-200 border-[1px] rounded-[34px] pl-12 pt-8 pr-14 pb-20">
						<div className="flex items-center gap-auto px-8 pb-8 border-b-[1px] border-zinc-200">
							{steps.map((step) => (
								<Step
									key={step.id}
									id={step.id}
									isLast={step.isLast}
									currentStep={currentStep}
								/>
							))}
						</div>

						<div
							className={twMerge(
								"mt-8 text-left",
								currentStep === 6 && "flex flex-col items-center gap-2",
							)}
						>
							{currentStep === 6 && (
								<Image
									src="/finish.svg"
									alt="Finish"
									width={0}
									height={0}
									className="mb-[10px] size-[7.5rem]"
								/>
							)}

							<h2 className="text-2xl font-bold text-indigo-950">
								{steps[currentStep].title}
							</h2>
							<p
								className={twMerge(
									"mt-2 text-zinc-500 max-w-[500px] text-left",
									currentStep === 6 && "text-center",
								)}
							>
								{steps[currentStep].description}
							</p>

							{currentStep === 6 && (
								<button
									type="button"
									onClick={finalSubmit}
									className="mt-4 px-10 py-3 bg-indigo-600 text-white rounded-[66px] hover:bg-indigo-700 transition-colors duration-100"
								>
									Submit
								</button>
							)}
					

							{currentStep === 4 ? (

								<div className="flex flex-col gap-11 mt-10">
								<ConditionalComponent items={conditionalComponent} />
								</div>
					
							) : 

								<div className="flex flex-col gap-11 mt-10">
								{steps[currentStep].component}
								</div>
							 }

					
						</div>
					</section>

					<div className="flex items-center justify-between">
						{currentStep > 0 && (
							<button
								type="button"
								onClick={previousStep}
								disabled={invalidGreyOut}
								className="px-10 py-3 bg-transparent cursor-pointer text-indigo-600 border-[1px] border-indigo-600 rounded-[66px] hover:bg-indigo-600 hover:text-white transition-colors duration-100
								disabled:bg-transparent disabled:border-[1px] disabled:border-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed "
							>
								Previous Step
							</button>
						)}

						<div />

						{currentStep < steps.length - 1 && (
							<button
								type="button"
								onClick={nextStep}
								disabled={invalidGreyOut}
								className="px-10 py-3 bg-indigo-600 text-white rounded-[66px] hover:bg-indigo-700 transition-colors duration-100
								disabled:bg-transparent disabled:border-[1px] disabled:border-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed 
							"
							>
								Next Step
							</button>
						)}
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
