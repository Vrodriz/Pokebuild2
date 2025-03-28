import styled from "styled-components";

// 🔹 Definição de um sistema de temas
const theme = {
  colors: {
    primary: "#16213e",
    secondary: "#0f3460",
    accent: "rgba(255, 255, 255, 0.1)",
    text: "#000",
    textWhite: "#fff",
    border: "#000",
    shadow: "rgba(0, 0, 0, 0.3)",
    gray: "gray",
  },
  borderRadius: "16px",
  transition: "0.3s ease-in-out",
};

// 🔹 Container principal
export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle at top, rgb(128, 128, 136), ${theme.colors.primary}, ${theme.colors.secondary});
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 🔹 Estilização base das seções
const SectionBase = styled.div`
  flex: 1;
  background: ${theme.colors.accent};
  border-radius: ${theme.borderRadius};
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px ${theme.colors.shadow};

  h2 {
    font-family: "Orbitron", sans-serif;
    color: ${theme.colors.text};
    margin-bottom: 15px;
    font-size: clamp(1.2rem, 2vw, 1.5rem);
  }
`;

// 🔹 Seções específicas herdando estilos base
export const TeamSection = styled(SectionBase)``;
export const PokemonSection = styled(SectionBase)`
  flex: 2;

  input {
    width: 80%;
    padding: 10px;
    margin-top: 12px;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    background: ${theme.colors.border};
    color: ${theme.colors.textWhite};
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: ${theme.transition};

    &::placeholder {
      color: ${theme.colors.textWhite};
    }

    &:focus {
      border-color: ${theme.colors.textWhite};
    }
  }

  button {
    background: ${theme.colors.border};
    border: none;
    padding: 12px 18px;
    margin-top: 12px;
    border-radius: 8px;
    font-weight: bold;
    color: ${theme.colors.textWhite};
    cursor: pointer;
    transition: transform 0.2s, background 0.3s;

    &:hover {
      transform: scale(1.05);
      background: ${theme.colors.gray};
    }
  }
`;

// 🔹 Grid de Pokémons
export const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  justify-content: center;
`;

// 🔹 Cartão de Pokémon
export const PokemonCard = styled.div`
  background: ${theme.colors.gray};
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${theme.colors.shadow};
  text-align: center;
  cursor: pointer;
  transition: ${theme.transition};
  border: 2px solid ${theme.colors.border};
  backdrop-filter: blur(10px);

  &:hover {
    transform: scale(0.95);
    border-color: ${theme.colors.gray};
    box-shadow: 0 4px 15px ${theme.colors.gray};
  }

  img {
    width: 100px;
    height: 100px;
    filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.5));
  }

  p {
    font-weight: bold;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    text-transform: capitalize;
    color: ${theme.colors.text};
    margin-top: 8px;
  }
`;

// 🔹 Tipos de Pokémon
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
    color: ${theme.colors.textWhite};
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
