// styles.js
import styled from 'styled-components';

export const TodoAppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Button = styled.button`
  background-color: #61dafb;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4fa3d1;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
`;

export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const TodoItem = styled.li`
  background-color: #fff;
  padding: 10px;
  margin: 8px 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;
