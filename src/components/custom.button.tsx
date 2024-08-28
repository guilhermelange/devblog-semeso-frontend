import { Button } from "@chakra-ui/react";

interface ButtonRequest {
    loadingText?: string;
    callback: any;
    children: any;
    variant?: string;
    colorSchema?: string;
}
export default function CustomButton({ callback, children, loadingText, variant, colorSchema }: ButtonRequest) {
    const shouldUseCustomConfiguration = !!variant;

    if (shouldUseCustomConfiguration) {
        return (
            <Button
                loadingText={loadingText}
                variant={variant}
                colorScheme={colorSchema}
                onClick={callback}
            >
                {children}
            </Button>
        )
    } else {
        return (
            <Button
                loadingText={loadingText}
                onClick={callback}
                colorScheme={colorSchema}
                color={'white'}
            >
                {children}
            </Button>
        )
    }
    
}