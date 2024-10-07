import {useEffect, useMemo, useRef} from "react";
import {debounce} from "lodash";

const useDebounce = (callback: any, delay = 300) => {
    const ref = useRef(callback);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, delay);
    }, [delay]);

    useEffect(() => {
        return () => {
            debouncedCallback.cancel();
        };
    }, [debouncedCallback]);

    return debouncedCallback;
};

export default useDebounce;
