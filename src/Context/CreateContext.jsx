import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { getAuthme } from "../../utils/function";

// 1. Initialize context with null or undefined
export const DataContext = createContext();

export const DataProviderCompo = ({ children }) => {
  // 2. Fetch the auth data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['authdata'],
    queryFn: getAuthme,
    
    staleTime: 1000 * 60 * 5, 
  });

  return (
    // 3. The prop MUST be named "value", not "data"
    // We pass loading and error states so components can react accordingly
    <DataContext.Provider value={{ user: data, isLoading, isError, error }}>
      {children}
    </DataContext.Provider>
  );
};
