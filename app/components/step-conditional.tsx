import { LetterText } from "lucide-react";
import { TextArea } from "./input";
import { useFormContext } from "react-hook-form";
import type { FormSchema } from "./form";


export interface ConditionalComponentProps {
    questionLabel: string;
    questionName: keyof FormSchema;
    questionPlaceholder?: string;
}

interface ConditionalComponentArrayProps {
    items: ConditionalComponentProps[];
}

export function ConditionalComponent({ items }: ConditionalComponentArrayProps) {
    const methods = useFormContext<FormSchema>();

    return (
        <>
            <div className="flex flex-col space-y-8">
                {items.map((item, index) => (
                    <TextArea
                        key={index}
                        label={item.questionLabel}
                        register={methods.register}
                        name={item.questionName}
                        errors={methods.formState.errors}
                        icon={LetterText}
                        placeholder={item.questionPlaceholder ?? ""} 
                    />
                ))}
            </div>
        </>
    );
}
