import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import { initialState, homeReducer } from "../reducers/homeReducer";
import usePagination from "../hooks/paginationHook";

const HomePage = () => {

  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { titles, title, search, profiles, page, count } = state;

  const{previousPage, nextPage} = usePagination(count);

      useEffect(() => {
      fetch("https://web.ics.purdue.edu/~glagman/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_TITLES", payload: data.titles });

    });
  }, []);

    const handleTitleChange = (event) => {

      dispatch({type: "SET_TITLE", payload: event.target.value});
    };

  
    const handleSearchChange = (event) => {
      dispatch({ type: "SET_SEARCH", payload: event.target.value });
    }

    useEffect(() => {

      fetch(
        `https://web.ics.purdue.edu/~glagman/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`
      )
      .then((res) => res.json())
      .then((data) => {
        dispatch({type: "FETCH_DATA", payload: data});
      });

    }, [title. search, page]); //check

    const handleClear = () => {
      dispatch({ type: "CLEAR_FILTER"});
   };

  const buttonStyle = {
    border: "1px solid #ccc",
  };

  return (

    <Wrapper>
      
      <h1> <br /><br /> Welcome! </h1>
      <p> Thank you for taking the time to view my portfolio site!
          Feel free to browse through topics in the navbar or check below for 
          collaboration details!
      </p>
      <br /><br/>

      <h3> <br /> Current Collaborators: </h3> <br />

      <div className="filter-wrapper">
        
        <div className="filter--select">
        
        <label htmlFor="title-select">Select a field:  </label>
           
            <select 
              id="title-select" 
              onChange={handleTitleChange} 
              value={title}
            >

            <option value=""> All </option>

            {titles.map((title) => (
              <option key={title} value={title}>
                  {title}
              </option>
            ))}

            </select>

        </div>
          
        <div className="filter--search">

          <label htmlFor="search">Search by name:  </label>

          <input
            type="text"
            id="search"
            onChange={handleSearchChange}
            value={search}
          />

        </div>
            
          <button onClick={handleClear} style={buttonStyle}>
            <span className="sr-only">Reset</span>
            <FontAwesomeIcon icon={faXmark} />
          </button>

        </div>
        
        <div className="profile-cards">
            
          {profiles.map((profile) => (
            <div className = "profile-card" key={profile.email}>
              <Card {...profile} /> 
            </div>
            )
          )}
       </div>
  
  {
    count === 0 && <p> No profiles found! </p>
  }
          
  {count > 10 && (
            
  <div className="pagination">

    <button onClick = {previousPage} disabled={page === 1}> 
      <span className="sr-only"> Previous </span>
    </button>
              
    <span> {page}/{Math.ceil(count/10)} </span>
              
    <button onClick = {previousPage} disabled={page >= Math.ceil(count/10)}> Next 
      <span className="sr-only"> Next </span>
    </button> 
              
    </div>

  )} 

</Wrapper>
);
};

export default HomePage;