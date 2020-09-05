import React, { useEffect, useState } from "react";
import Panel from "emerald-ui/lib/Panel";
import styled from "styled-components";
import { list } from "../../api";
import { FETCH_STATUS } from "../../config";
import Spinner from "emerald-ui/lib/Spinner";
import List from "./List";

const PanelStyled = styled(Panel)`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: -8px 14px 27px 0px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: -8px 14px 27px 0px rgba(0, 0, 0, 0.61);
  box-shadow: -8px 14px 27px 0px rgba(0, 0, 0, 0.61);
`;


const DivStyled = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  width: auto;
  padding: 10px;
  white-space: nowrap;
`;

export default function Board() {
  const [lists, setList] = useState({
    content: null,
    fetchStatus: FETCH_STATUS.LOADING,
  });

  useEffect(() => {
    const getList = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const listResponse = await list.getList(token);
      if (listResponse.data) {
        setList({
          content: listResponse.data.lists,
          fetchStatus: FETCH_STATUS.LOADED,
        });
      } else {
        setList({
          content: null,
          fetchStatus: FETCH_STATUS.NOT_LOADED,
        });
      }
    };

    getList();
  }, []);

  const ListsAggruped = () => {
    const { content } = lists;
    let listsToView = []
    listsToView = content.map((ele, i) => {
        return <List key={i} data={ele}/>;
    });
    listsToView.push(<List key={999} newEdit={true} saveList={saveList}/>)
    return listsToView;
  };

  const saveList = (name)=>{
    console.log('Va a guardar', name);
  }


  return (
    <div>
      <PanelStyled>
        <h2>Main Board</h2>
        {lists.fetchStatus === FETCH_STATUS.LOADING ? (
          <Spinner />
        ) : (
          <DivStyled>
            <ListsAggruped/>
          </DivStyled>
        )}
      </PanelStyled>
    </div>
  );
}
