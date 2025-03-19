import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TeamSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export const PokemonSection = styled.div`
  flex: 2;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;
