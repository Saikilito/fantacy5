import styled from 'styled-components'

export const ContainerStyled = styled.div`
  color: white;
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 24px;
  }
`

export const ContainerGrandStyled = styled.div`
  color: white;
  height: 100vh;
  width: 100vw;
  max-width: ${props => props.width ?? '470px'};
  margin: auto;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 24px;
  }
`

export const SmallContainerStyled = styled.div`
  display: 'flex';
  flex-direction: 'column';
  align-content: 'center';
  align-items: 'center';
  height: '100%';
  color: white;
  margin: 2rem;
`
