import { useMemo } from "react";

const useFormattedDate = (dateString) => {
    return useMemo(() => {
        if (!dateString) return "";

        const [year, month, day] = dateString.split("-");
        if (!year || !month || !day) return "";
        const date = new Date(year, month - 1, day);
        if (isNaN(date)) return "";

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }, [dateString]);
};

export default useFormattedDate;