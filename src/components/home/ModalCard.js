import React, { useState } from "react";
import Modal from "emerald-ui/lib/Modal";
import Button from "emerald-ui/lib/Button";
import SingleSelect from "emerald-ui/lib/SingleSelect";
import Alert from "./Alert";
import { card } from "../../api";
import { getToken, mapLabelPositionCard } from "../../utils";
import { colorOptions, positionOptions } from "../../constants";
import Label from "emerald-ui/lib/Label/Label";

export default function ModalMessage({
  show,
  primaryAction,
  cancelAction,
  isEdit = false,
  listOptions,
  currentCard,
}) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [listOfCard, setListOfCard] = useState();
  const [color, setColor] = useState();
  const [position, setPosition] = useState();
  const [textStatus, setTextStatus] = useState();
  const [showTextStatus, setShowTextStatus] = useState(false);
  let labelCard;

  if (listOptions) listOptions.forEach((e) => (e.value = e._id));

  if (!isEdit) labelCard = mapLabelPositionCard(currentCard.position);

  const saveNewCard = async () => {
    if (!title) {
      setTextStatus("Please write a title for the card");
      setShowTextStatus(true);
    } else {
      try {
        const token = getToken();
        const newCard = {
          title,
          description,
          listId: listOfCard || listOptions[0]._id,
          color,
          position: position || "low",
        };
        await card.createCard(token, newCard);
        restartField();
        await primaryAction();
        cancelAction();
      } catch (err) {
        setTextStatus("The card was not created please try again");
        setShowTextStatus(true);
        console.error("An error while the card was created: ", err);
      }
    }
  };

  const restartField = () => {
    setTitle();
    setDescription();
    setListOfCard();
    setPosition();
    setColor();
  };

  const SelectOption = ({ id, options, onSelect, currentSelect }) => {
    return (
      <SingleSelect
        onSelect={(ele) => {
          console.log("SelectOption -> ele", ele);
          onSelect(ele);
        }}
        id={id}
      >
        {options ? (
          options.map((ele, i) => {
            return (
              <option
                key={i}
                value={ele.value}
                selected={currentSelect === ele.value}
              >
                {ele.name}
              </option>
            );
          })
        ) : (
          <option value="">Not options</option>
        )}
      </SingleSelect>
    );
  };

  const saveEditCard = async () => {
    try {
      const token = getToken();
      if (!listOfCard) {
        setTextStatus("Please make a change to save");
        setShowTextStatus(true);
      } else {
        const editData = {
          idCard: currentCard._id,
          listId: listOfCard,
        };
        await card.updateCard(token, editData);
        
        primaryAction();
        cancelAction();
      }
    } catch (err) {
      setTextStatus("The card was not created please try again");
      setShowTextStatus(true);
      console.error("An error while the card was created: ", err);
    }
  };

  const deleteCard = async () => {
    try {
      const token = getToken();
      await card.deleteCard(token, currentCard._id);
      primaryAction();
      cancelAction();
    } catch (err) {
      setTextStatus("The card was not created please try again");
      setShowTextStatus(true);
      console.error("An error while the card was created: ", err);
    }
  };

  return (
    <Modal show={show}>
      {isEdit ? (
        <>
          <Modal.Header closeButton={false}>
            <Modal.Title className="form">
              <label>Title of the card: </label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="form">
            <div style={{ alignItems: "center" }}>
              <label>Description: </label>
              <br />
              <textarea
                placeholder="Please write the details of this new card (optional)"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <label>Select a List </label>
              <SelectOption
                id="s1"
                onSelect={setListOfCard}
                currentSelect={listOfCard}
                options={listOptions}
              />

              <label>Select a color</label>
              <SelectOption
                id="s2"
                onSelect={setColor}
                currentSelect={color}
                options={colorOptions}
              />

              <label>Select a position to new card </label>
              <SelectOption
                id="s3"
                onSelect={setPosition}
                currentSelect={position}
                options={positionOptions}
              />
            </div>
            <Alert
              text={textStatus}
              show={showTextStatus}
              setShow={setShowTextStatus}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => cancelAction()} shape="flat" color="info">
              Cancel
            </Button>
            <Button onClick={saveNewCard} color="success">
              Save Card
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>
              <Label color={labelCard.colorLabel}>{labelCard.label}</Label>
              <b>{` ${currentCard.title}`}</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>{currentCard.description || "Not description"}</p>
            </div>
            <hr />
            <label>Move card to</label>
            <br />
            <SelectOption
              id="s1"
              onSelect={setListOfCard}
              currentSelect={currentCard.listId}
              options={listOptions}
            />
            <Alert
              text={textStatus}
              show={showTextStatus}
              setShow={setShowTextStatus}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => cancelAction()} shape="flat" color="info">
              Cancel
            </Button>
            <Button>Edit</Button>
            <Button color="warning">Archive</Button>
            <Button color="danger" onClick={deleteCard}>
              Delete
            </Button>
            <Button color="success" onClick={saveEditCard}>
              Save Changes
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
