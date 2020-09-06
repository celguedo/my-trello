import React, { useState } from "react";
import Modal from "emerald-ui/lib/Modal";
import Button from "emerald-ui/lib/Button";
import SingleSelect from "emerald-ui/lib/SingleSelect";
import Label from "emerald-ui/lib/Label";
import TextField from "emerald-ui/lib/TextField";
import Alert from "./Alert";
import { card } from "../../api";
import { getToken, mapLabelPriorityCard } from "../../utils";
import { colorOptions, priorityOptions } from "../../constants";
import { LabelRight } from "./Card";

export default function ModalMessage({
  show,
  primaryAction,
  cancelAction,
  isEdit = false,
  listOptions,
  currentCard,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listOfCard, setListOfCard] = useState();
  const [color, setColor] = useState();
  const [priority, setPriority] = useState();
  const [textStatus, setTextStatus] = useState();
  const [showTextStatus, setShowTextStatus] = useState(false);
  const [enableEditionFilds, setEnableEditionFilds] = useState(false);
  let labelCard;

  if (listOptions) listOptions.forEach((e) => (e.value = e._id));

  if (!isEdit) labelCard = mapLabelPriorityCard(currentCard.priority);

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
          priority: priority || "low",
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
    setPriority();
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
      if (!listOfCard && !title && !description && !color && !priority) {
        setTextStatus("Please make a change to save");
        setShowTextStatus(true);
      } else {
        const editData = {
          idCard: currentCard._id,
          listId: listOfCard,
          title,
          description,
          color,
          priority
        };
        await card.updateCard(token, editData);
        setEnableEditionFilds(false);
        primaryAction();
        cancelAction();
      }
    } catch (err) {
      setTextStatus("The card was not update, please try again");
      setShowTextStatus(true);
      console.error("An error while the card was updated: ", err);
    }
  };

  const toogleArchiveCard = async () => {
    try {
      const token = getToken();
      const editData = {
        idCard: currentCard._id,
        status: !currentCard.status,
      };
      await card.updateCard(token, editData);

      primaryAction();
      cancelAction();
    } catch (err) {
      setTextStatus("The card was not updated please try again");
      setShowTextStatus(true);
      console.error("An error while the card was updated: ", err);
    }
  };

  const toogleEditionFields = () => {
    setEnableEditionFilds(!enableEditionFilds);
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

              <label>Select a priority for the new card </label>
              <SelectOption
                id="s3"
                onSelect={setPriority}
                currentSelect={priority}
                options={priorityOptions}
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
              {enableEditionFilds ? (
                <TextField
                  type="text"
                  label="Title"
                  placeholder={currentCard.title}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || currentCard.title}
                />
              ) : (
                <>
                  <Label color={labelCard.colorLabel}>{labelCard.label}</Label>
                  <b>{` ${currentCard.title}`}</b>
                </>
              )}
              {!currentCard.status && (
                <LabelRight color="warning">This card is archived</LabelRight>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {enableEditionFilds ? (
                <>
                  <TextField
                    type="text"
                    label="Description"
                    placeholder={
                      currentCard.description || "Write a description"
                    }
                    onChange={(e) => setDescription(e.target.value)}
                    value={
                      description || currentCard.description || description
                    }
                    style={{ width: "100%" }}
                  />
                  <br />
                  <label>Change color</label>
                  <br />
                  <SelectOption
                    id="s1"
                    onSelect={setColor}
                    currentSelect={currentCard.color}
                    options={colorOptions}
                  />
                  <br />
                  <label>Change priority</label>
                  <br />
                  <SelectOption
                    id="s2"
                    onSelect={setPriority}
                    currentSelect={currentCard.priority}
                    options={priorityOptions}
                  />
                </>
              ) : (
                <p>{currentCard.description || "Not description"}</p>
              )}
            </div>
            <hr />
            {currentCard.status && !enableEditionFilds && (
              <div>
                <label>Move card to</label>
                <br />
                <SelectOption
                  id="s1"
                  onSelect={setListOfCard}
                  currentSelect={currentCard.listId}
                  options={listOptions}
                />
              </div>
            )}

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
            <Button onClick={toogleEditionFields}>
              {enableEditionFilds ? "Disable edition fields" : "Enable Edition"}
            </Button>
            <br />
            <br />

            <Button color="danger" onClick={deleteCard}>
              Delete
            </Button>
            <Button color="warning" onClick={toogleArchiveCard}>
              {currentCard.status ? "Archive" : "Unarchive"}
            </Button>
            {currentCard.status && (
              <Button color="success" onClick={saveEditCard}>
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
