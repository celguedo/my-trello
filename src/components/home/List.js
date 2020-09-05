import React, { useState } from "react";
import styled from "styled-components";
import CardGrid from "emerald-ui/lib/CardGrid";
import Button from "emerald-ui/lib/Button";

const ListContainer = styled(CardGrid)`
  -webkit-box-shadow: 7px 4px 49px -16px rgba(0, 0, 0, 0.64);
  -moz-box-shadow: 7px 4px 49px -16px rgba(0, 0, 0, 0.64);
  box-shadow: 7px 4px 49px -16px rgba(0, 0, 0, 0.64);
  padding: 20px;
  width: 300px;
  min-width: 200px;
  min-height: 500px;
  height: 700px;
  margin: 0 10px 0 0;
  display: inline-block;
`;

const ButtonStyled = styled(Button)`
  color: red;
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

const DivStyled = styled.div`
  height: 100%;
  position: relative;
`;

export default function List({ newEdit = false, saveList }) {
  const [newListName, setNewListName] = useState("");

  return (
    <ListContainer>
      {newEdit ? (
        <DivStyled>
          <p>Create a new List</p>
          <input
            id="add-new-list"
            type="text"
            placeholder="name of the new list"
            onChange={(e) => setNewListName(e.target.value)}
          />
          <br />
          <ButtonStyled onClick={saveList(newListName)}>Save List</ButtonStyled>
        </DivStyled>
      ) : (
        <p>Datos normales</p>
      )}
    </ListContainer>
  );
}
