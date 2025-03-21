import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle at top,rgb(128, 128, 136), #16213e, #0f3460);
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


export const TeamSection = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);

  h2 {
    font-family: "Orbitron", sans-serif;
    color: black;
  }
`;


export const PokemonSection = styled.div`
  flex: 2;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);

  h2 {
    font-family: "Orbitron", sans-serif;
    color: black;
  }

  input {
    width: 80%;
    padding: 8px;
    margin-top: 10px;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    background: black;
    color: white;

    &::placeholder {
      color: white;
    }
  }

  button {
    background: black;
    border: none;
    padding: 12px 18px;
    margin-top: 10px;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }
`;


export const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  justify-content: center;
`;

export const PokemonCard = styled.div`
  background: gray;
  margin-top: 5px;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 10px black;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  border: 2px solid black;
  backdrop-filter: blur(10px);

  &:hover {
    transform: scale(0.9);
    border-color: gray;
    box-shadow: 0 4px 15px gray;
  }

  img {
    width: 100px;
    height: 100px;
    filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.5));
  }

  p {
    font-weight: bold;
    font-size: 16px;
    text-transform: capitalize;
    color: black;
  }
`;
export const PokemonTypes = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 8px;

  span {
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
    text-transform: capitalize;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
