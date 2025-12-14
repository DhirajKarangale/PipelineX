import {
    LogIn,
    Package,
    Type,
    Brain,
    Hash,
    Split,
    Clock,
    Merge,
    Globe,
} from "lucide-react";

export const NODE_ITEMS = [
    { type: "customInput", label: "Input", icon: LogIn },
    { type: "customOutput", label: "Output", icon: Package },
    { type: "text", label: "Text", icon: Type },
    { type: "llm", label: "LLM", icon: Brain },
    { type: "number", label: "Number", icon: Hash },
    { type: "condition", label: "Condition", icon: Split },
    { type: "delay", label: "Delay", icon: Clock },
    { type: "merge", label: "Merge", icon: Merge },
    { type: "apiRequest", label: "API", icon: Globe },
];