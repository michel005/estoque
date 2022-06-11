import { createContext, useEffect, useState } from "react";

interface ErrorType {
    title: string;
    body: string;
    code: string;
}

interface ErrorContextType {
    error: ErrorType | null;
    setError: Function;
}

const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => {},
});

const ErrorContextProvider = ({ children }) => {
    const [error, setError] = useState<ErrorType | null>(null);

    return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};

export { ErrorContext };

export default ErrorContextProvider;
