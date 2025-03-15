import {useEffect, useReducer} from "react";
import { initialState, homeReducer } from "../reducers/homeReducer";

function useHomePage()
{
    const [state, dispatch] = useReducer(homeReducer, initialState);
    const{title, search, page} = state;


useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~glagman/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
    .then((res) => res.json())
    .then((data) => {
        dispatch({type: "FETCH_DATA", payload: data});
    });
}, [title, search, page]);

return{
    state, dispatch,
};

}

export default useHomePage;