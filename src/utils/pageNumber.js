import { useLocation } from "react-router-dom";

const useGetPageNumber = () => {
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const page = parseInt(pathParts[pathParts.length-1]);
    return page;
};

export {
    useGetPageNumber  
};