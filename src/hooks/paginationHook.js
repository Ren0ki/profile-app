import { useState } from "react";

function usePagination(count)
{
    const [page, setPage] = useState(1);

    const previousPage = () =>
    {   
        if(page != 1)
        {
            setPage(page - 1);
        }

    };

    const nextPage = () =>
    {
        if(page <= Math.ceil(count/10))
        {
            setPage(page + 1);
        }
    };


return{
    page,
    previousPage,
    nextPage,
};

}

export default usePagination;