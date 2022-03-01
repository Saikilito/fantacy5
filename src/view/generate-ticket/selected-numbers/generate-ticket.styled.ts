import styled from 'styled-components'

export const SmallContainer = styled.div`
  display: 'flex';
  flex-direction: 'column';
  align-content: 'center';
  align-items: 'center';
  height: '100%';
  color: white;
  margin: 2rem;
`

export const NumberButton = styled.button`
  width: 50px;
  height: 50px;
  background: #2c3e50;
  border-radius: 1rem;
  margin: 1rem 0.5rem;
  color: white;

  :hover {
    background: #95a5a6;
    transition: 0.5s;
    transform: scale(1.2);
  }

  :active {
    background: #95a5a6;
    transform: scale(1.2);
  }
`
