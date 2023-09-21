import styled from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  border-radius: 3px;
  padding: 4px 8px;
  margin-right: 16px;
  text-transform: capitalize;
  &[name='good']:hover {
    border: 2px solid green;
  }
  &[name='neutral']:hover {
    border: 2px solid orange;
  }
  &[name='bad']:hover {
    border: 2px solid red;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 300px;
`;
