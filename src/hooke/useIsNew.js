import { useMemo } from "react";

const useIsNew = (dateString) => {
    return useMemo(() => {
        if (!dateString) return false;

        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        const itemDate = new Date(dateString);

        return itemDate >= oneMonthAgo;
    }, [dateString]);
};
export default useIsNew;