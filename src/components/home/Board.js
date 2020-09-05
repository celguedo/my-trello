import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Panel from "emerald-ui/lib/Panel";
import styled from "styled-components";
import { list } from "../../api";
import { FETCH_STATUS } from "../../config";
import Spinner from "emerald-ui/lib/Spinner";
import List from "./List";
import Alert from "./Alert";
import ModalMesage from "./ModalMesage";
import { getToken, setToken } from "../../utils";

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
  const history = useHistory();
  const [alertText, setAlertText] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const getList = async () => {
      let token = getToken();
      if (token === null) {
        setToken("");
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
    let listsToView = [];
    listsToView = content.map((ele, i) => {
      return (
        <List key={i} data={ele} onDelete={deleteList} onEdit={editList} />
      );
    });
    listsToView.push(<List key={999} newEdit={true} saveList={createList} />);
    return listsToView;
  };

  const createList = async (name) => {
    if (!name) {
      setAlertShow(true);
      setAlertText("Please check the name of the list");
    } else {
      const token = getToken();
      const createListResponse = await list.createList(token, name);
      if (createListResponse.data) {
        setModalText("The List was created successfully");
        setModalShow(true);
      }
    }
  };

  const deleteList = async (idList) => {
    console.log("Go to delete", idList);
  };

  const editList = async (idList) => {
    console.log("Go to edit", idList);
  };

  const closeModalMessage = () => {
    setModalShow(false);
    history.go();
  };

  return (
    <div>
      <ModalMesage
        show={modalShow}
        text={modalText}
        closeModal={closeModalMessage}
      />
      <PanelStyled>
        <h2>Main Board</h2>
        <Alert text={alertText} show={alertShow} setShow={setAlertShow} />
        {lists.fetchStatus === FETCH_STATUS.LOADING ? (
          <Spinner />
        ) : (
          <DivStyled>
            <ListsAggruped />
          </DivStyled>
        )}
      </PanelStyled>
    </div>
  );
}