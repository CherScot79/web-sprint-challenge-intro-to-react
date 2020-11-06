import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const kf = keyframes`
100% {opacity: 1;}
`

const StyledInfo = styled.div`
opacity: 0;
animation: ${kf} 0.5s ease-in forwards;
  color: ${(pr) => pr.theme.secondaryColor};
  background-color: ${(pr) => pr.theme.backgroundColor};
  padding: 0 3rem;
  border-radius: 10px;
  line-height: 1;
  font-size: 1.3rem;
  /* font-family: "Courier New", Courier, monospace; */
  display: flex;
  flex-direction: column;
  max-width: 20rem;
`;

const StyledList = styled.div`
  margin-top: 1rem;
`;

export default function Character(props) {
  const { mortyId, mortys } = props;
  const [charInfo, setCharInfo] = useState([]);

  useEffect(() => {
    mortys.forEach(
      (mt) => {
        if (mt.id === mortyId) {
          setCharInfo(mt);
        }
      },
      [mortyId]
    );
  });

  // setCharInfo(mortys[mortyId]);
  // console.log (charInfo)
  return (
    <StyledInfo className='mortyInfo'>
      <h2>{charInfo.name}</h2>
      <img src={charInfo.image} alt='charInfo.name' />
      <StyledList>
        <p>species: {charInfo.species}</p>
        <p>status: {charInfo.status}</p>
        <p>location: {charInfo.location && charInfo.location.name}</p>
      </StyledList>
    </StyledInfo>
  );
}