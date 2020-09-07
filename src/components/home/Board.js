import React, { useEffect, useState } from "react";
/* import { useHistory } from "react-router-dom"; */
import Panel from "emerald-ui/lib/Panel";
import styled from "styled-components";
import { list, card } from "../../api";
import { FETCH_STATUS } from "../../constants";
import Spinner from "emerald-ui/lib/Spinner";
import IconDropdown from "emerald-ui/lib/IconDropdown";
import DropdownItem from "emerald-ui/lib/DropdownItem";
import List from "./List";
import Alert from "./Alert";
import ModalMesage from "./ModalMesage";
import ModalCard from "./ModalCard";
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
const H3Styled = styled.h3`
  text-align: center;
  font-weight: bold;
  margin-top: 50px;
`;

export const IconDropdownRightStyled = styled(IconDropdown)`
  float: right;
`;

export default function Board() {
  const [boardData, setBoardData] = useState({
    lists: [],
    cards: [],
    fetchStatus: FETCH_STATUS.LOADING,
  });
  const [alertText, setAlertText] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirmText, setmodalConfirmText] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [currentList, setcurrentList] = useState();
  const [currentCard, setcurrentCard] = useState();
  const [modalShowCard, setModalShowCard] = useState(false); //indicate if the modal of view/edit card is show
  const [isEditingCard, setIsEditingCard] = useState(true); //indicate if the card will be edit
  const [searchOwnFilters, setSearchOwnFilters] = useState(false);
  const [searchArchivesFilters, setSearchArchivesFilters] = useState(false);

  useEffect(() => {
    getBoardData();
  }, [searchOwnFilters, searchArchivesFilters]);

  const getBoardData = async () => {
    try {
      let token = getToken();
      if (token === null) {
        token = "";
        setToken(token);
      }
      const listResponse = await list.getList(token);
      const cardResponse = await card.getCard(token, {
        own: searchOwnFilters,
        archive: searchArchivesFilters,
      });

      if (listResponse.data) {
        setBoardData({
          lists: listResponse.data.lists,
          cards: cardResponse.data.cards,
          fetchStatus: FETCH_STATUS.LOADED,
        });
      }
    } catch (err) {
      console.error("error getting board data:", err);
      setBoardData({
        lists: [],
        card: [],
        fetchStatus: FETCH_STATUS.NOT_LOADED,
      });
    }
  };

  const ListsAggruped = () => {
    const { lists, cards } = boardData;
    let listsToView = [];
    listsToView = lists.map((ele, i) => {
      return (
        <List
          key={i}
          data={ele}
          onDelete={deleteList}
          onEdit={editList}
          cards={cards.filter(
            (cardItem) =>
              cardItem.listId === ele._id &&
              !cardItem.status === searchArchivesFilters
          )}
          viewCard={viewCard}
        />
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

  const deleteList = async (idList, nameList) => {
    setmodalConfirmText(
      `Are you sure of delete this List "${nameList}" ?\nThis action will remove all cards from the list`
    );
    setcurrentList(idList);
    setModalConfirm(true);
  };

  const deleteListConfirm = async () => {
    try {
      const token = getToken();
      const deleteListResponse = await list.deleteList(token, currentList);
      if (deleteListResponse.data) {
        setModalConfirm(false);
        getBoardData();
      }
    } catch (err) {
      console.log("An error while delete of list:", err);
    }
  };

  const editList = async (idList) => {
    console.log("Go to edit", idList);
  };

  const closeModalMessage = () => {
    setModalShow(false);
    getBoardData();
  };

  const createCard = async () => {
    setIsEditingCard(true);
    setModalShowCard(true);
  };

  const filterCards = async ({ own = false, archive = false }) => {
    setSearchOwnFilters(own);
    setSearchArchivesFilters(archive);
  };

  const viewCard = (cardData) => {
    setcurrentCard(cardData);
    setIsEditingCard(false);
    setModalShowCard(true);
  };

  return (
    <div>
      {/* Request response Modal */}
      <ModalMesage
        show={modalShow}
        text={modalText}
        primaryAction={closeModalMessage}
      />
      {/* Confirm Delete Modal*/}
      <ModalMesage
        show={modalConfirm}
        text={modalConfirmText}
        primaryAction={deleteListConfirm}
        cancelAction={setModalConfirm}
      />
      {/* Create a new card Modal */}
      <ModalCard
        show={modalShowCard}
        cancelAction={setModalShowCard}
        isEdit={isEditingCard}
        primaryAction={getBoardData}
        listOptions={boardData.lists}
        currentCard={currentCard}
      />
      <PanelStyled>
        <div>
          <label style={{ fontSize: "large", fontWeight: "bold" }}>
            Main Board
            {(searchOwnFilters || searchArchivesFilters) && (
              <span style={{ fontSize: "small", fontWeight: "bold" }}>
                {` - (A search filter activated)`}
              </span>
            )}
          </label>
          <IconDropdownRightStyled
            ariaLabel="See more options"
            icon="more_vert"
          >
            <DropdownItem onClick={createCard} eventKey="1">
              Create a new Card
            </DropdownItem>
            <DropdownItem separator />
            <DropdownItem
              onClick={() => filterCards({ own: true })}
              eventKey="2"
            >
              Search cards created by me
            </DropdownItem>
            <DropdownItem
              onClick={() => filterCards({ archive: true })}
              eventKey="3"
            >
              Search archives cards
            </DropdownItem>
            <DropdownItem
              onClick={() => filterCards({ archive: false, own: false })}
              eventKey="4"
            >
              View all cards
            </DropdownItem>
          </IconDropdownRightStyled>
        </div>
        <Alert text={alertText} show={alertShow} setShow={setAlertShow} />
        <br />
        {boardData.fetchStatus === FETCH_STATUS.LOADING ? (
          <Spinner />
        ) : (
          <DivStyled>
            <ListsAggruped />
          </DivStyled>
        )}
      </PanelStyled>
      <H3Styled>Condor Labs - Carlos Elguedo - 2020 - ©</H3Styled>
    </div>
  );
}
