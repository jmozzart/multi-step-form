import { useFormContext } from "react-hook-form";
import type { FormSchema } from "./form";
import { twMerge } from "tailwind-merge";
import Uploader from "./vercel-blob-upload";

export default function StepSix() {

    return (
        <>
            <Uploader schemaField="financial" heading="Financial Documents" />

            <Uploader schemaField="industry_documents" heading="Industry Documents" />

            <Uploader schemaField="non_financial" heading="Non-financial Documents" />

            <Uploader schemaField="existing_paper" heading="Other Documents" />

        </>
    );
}
