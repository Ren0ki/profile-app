import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

const HomePage = () => {

  const [title, setTitle] = useState(""); 
  const [titles, setTitles] = useState([]);
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

      useEffect(() => {
      fetch("https://web.ics.purdue.edu/~glagman/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
      setTitles(data.titles);

    });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

    useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~glagman/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`
    )
    .then((res) => res.json())
    .then((data) => {
    setProfiles(data.profiles);
    setCount(data.count);
    setPage(data.page);
    })
    }, [title, search, page]);
    
  const handleClear = () => {
    setTitle("");
    setSearch("");
    setPage(1);
  };

  //const titles = [...new Set(profiles.map((profile) => profile.title))];

  const filteredProfiles = profiles.filter(
    (profile) =>
     (title === "" || profile.title === title) &&
      profile.name.toLowerCase().includes(search.toLowerCase())
  );

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
            
          {filteredProfiles.map((profile) => (
           
           <Card
              key={profile.email}
              {...profile}
            /> 

            )
        )}
  </div>
  
  {
    count === 0 && <p> No profiles found! </p>
  }
          
  {count > 10 && (
            
  <div className="pagination">

    <button onClick = {() => setPage(page - 1)} disabled={page === 1}> 
      <span className="sr-only"> Previous </span>
    </button>
              
    <span> {page}/{Math.ceil(count/10)} </span>
              
    <button onClick = {() => setPage(page + 1)} disabled={page >= Math.ceil(count/10)}> Next 
      <span className="sr-only"> Next </span>
    </button> 
              
    </div>

  )} 

</Wrapper>
);
};

export default HomePage;