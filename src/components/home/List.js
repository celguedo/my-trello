import React, { useState } from "react";
import styled from "styled-components";
import CardGrid from "emerald-ui/lib/CardGrid";
import Button from "emerald-ui/lib/Button";
import DropdownButton from "emerald-ui/lib/DropdownButton";
import DropdownItem from "emerald-ui/lib/DropdownItem";

const ListContainer = styled(CardGrid)`
  -webkit-box-shadow: 7px 4px 49px -16px rgba(0, 0, 0, 0.64);
  -moz-box-shadow: 7px 4px 49px -16px rgba(0, 0, 0, 0.64);
  box-shadow: 7px 4px 49px -16px rgba(0, 0, 0, 0.64);
  padding: 20px;
  width: 300px;
  min-width: 230px;
  min-height: 500px;
  height: 700px;
  margin: 0 10px 0 0;
  display: inline-block;
`;

const ButtonStyled = styled(Button)`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;
const DropdownButtonStyled = styled(DropdownButton)`
  position: absolute;
  top: 0px;
  right: 10px;
`;

const DivStyled = styled.div`
  height: 100%;
  position: relative;
`;

export default function List({
  data = {},
  onDelete,
  onEdit,
  newEdit = false,
  saveList,
}) {
  const [newListName, setNewListName] = useState("");

  return (
    <ListContainer>
      {newEdit ? (
        <DivStyled>
          <p className="list-title">Create a new List</p>
          <input
            id="add-new-list"
            type="text"
            placeholder="name of the new list"
            onChange={(e) => setNewListName(e.target.value)}
          />
          <br />
          <ButtonStyled
            onClick={() => {
              saveList(newListName);
            }}
          >
            Save List
          </ButtonStyled>
        </DivStyled>
      ) : (
        <DivStyled>
          <p className="list-title">{data.name}</p>
          <DropdownButtonStyled>
            <DropdownItem onClick={() => onEdit(data._id)} eventKey="1">
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => onDelete(data._id, data.name)} eventKey="2">
              Delete
            </DropdownItem>
          </DropdownButtonStyled>
        </DivStyled>
      )}
    </ListContainer>
  );
}
