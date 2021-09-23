import { useLocation } from "react-router-dom";

const useQueryString = () => {
    const location = useLocation();

    return new URLSearchParams(location.search);
}

export default useQueryString;