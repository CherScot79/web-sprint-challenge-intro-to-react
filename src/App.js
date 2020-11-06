import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Character from "./components/Character";
import styled from "styled-components";

const StyledApp = styled.div`
  font-family: "Press Start 2P", sans-serif;
  font-size: 1.2rem;
  margin: auto;
  h1 {
    font-size: 4rem;
    color: black;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
`;

const StyledMortyList = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: 4rem 2rem 0 5%;
  color: ${(pr) => pr.theme.secondaryColor};
  background-color: ${(pr) => pr.theme.backgroundColor};
  padding: 20px;
  border-radius: 10px;
`;

const StyledMortyName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
  button {
    background-color: ${(pr) => pr.theme.dangerColor};
    border: 2px solid ${(pr) => pr.theme.secondaryColor};
    border-radius: 5px;
    color: ${(pr) => pr.theme.secondaryColor};
    font-family: "Press Start 2P", sans-serif;
    font-size: 1rem;
    width: 2.2rem;
    height: 2.2rem;
    &:hover {
      background-color: ${(pr) => pr.theme.tertiaryColor};
      border: 2px solid ${(pr) => pr.theme.tertiaryColor};
      color: ${(pr) => pr.theme.dangerColor};
      transition: all 0.3s ease-in-out;
    }
  }
`;

const StyledCharContainer = styled.div`
  width: 400px;
  margin-right:5%;
`

const App = () => {
  const [mortys, setMortys] = useState([]);
  const [currentMortyId, setCurrentMortyId] = useState(null);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character/?name=morty&status=dead")
      .then((res) => {
        setMortys(res.data.results);
      })
      .catch((err) => {
        debugger;
      });
  }, []);

  const openDetails = (id) => {
    setCurrentMortyId(id);
  };

  const closeDetails = () => {
    setCurrentMortyId(null);
  };

  const Morty = (props) => (
    <StyledMortyName className='morty'>
      {props.info.name} &nbsp;
      <button
        onClick={() =>
          props.info.id === currentMortyId
            ? closeDetails()
            : openDetails(props.info.id)
        }
      >
        {props.info.id === currentMortyId ? "-" : "+"}
      </button>
    </StyledMortyName>
  );

  return (
    <StyledApp className='App'>
      <h1 className='Header'>Dead Morty's</h1>
      <h2>(Documented)</h2>
      <StyledContainer className='container'>
        <StyledMortyList className='mortyList'>
          {mortys.map((mt) => {
            return <Morty key={mt.id} info={mt} />;
          })}
        </StyledMortyList>
        <StyledCharContainer>
          {currentMortyId && (
            <Character mortyId={currentMortyId} mortys={mortys} />
          )}
        </StyledCharContainer>
      </StyledContainer>
    </StyledApp>
  );
};

export default App;