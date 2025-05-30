import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { getUserPreference, updateUserPreference } from "@/utils/userPreferences";

interface PersistentTabsProps extends React.ComponentProps<typeof Tabs> {
    preferencePath: string;
    children: React.ReactNode;
}

const PersistentTabs = ({
    preferencePath,
    defaultValue,
    value,
    onValueChange,
    children,
    ...props
}: PersistentTabsProps) => {
    // Load initial value from user preferences
    const [tabValue, setTabValue] = useState<string>(() => {
        return getUserPreference<string>(preferencePath, (defaultValue as string) || "");
    });

    // Save to user preferences when value changes
    useEffect(() => {
        if (tabValue) {
            updateUserPreference(preferencePath, tabValue);
        }
    }, [tabValue, preferencePath]);

    // Value handling
    const handleValueChange = (newValue: string) => {
        setTabValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    // Use controlled value if provided
    const currentValue = value !== undefined ? value : tabValue;

    return (
        <Tabs
            defaultValue={defaultValue}
            value={currentValue}
            onValueChange={handleValueChange}
            {...props}
        >
            {children}
        </Tabs>
    );
};

export { PersistentTabs, TabsContent, TabsList, TabsTrigger }; 