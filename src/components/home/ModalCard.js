import React, { useState } from "react";
import Modal from "emerald-ui/lib/Modal";
import Button from "emerald-ui/lib/Button";
import SingleSelect from "emerald-ui/lib/SingleSelect";
import Alert from "./Alert";
import { card } from "../../api";
import { getToken } from "../../utils";

export default function ModalMessage({
  show,
  primaryAction,
  cancelAction,
  isEdit = false,
  listOptions,
}) {
  if (listOptions) listOptions.forEach((e) => (e.value = e._id));
  const colorOptions = [
    { value: "info", name: "Blue" },
    { value: "warning", name: "Orange" },
    { value: "danger", name: "Red" },
    { value: "success", name: "Green" },
  ];
  const positionOptions = [
    { value: "low", name: "Low" },
    { value: "medium", name: "Medium" },
    { value: "high", name: "High" },
  ];
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [listOfCard, setListOfCard] = useState();
  const [color, setColor] = useState();
  const [position, setPosition] = useState();
  const [textStatus, setTextStatus] = useState();
  const [showTextStatus, setShowTextStatus] = useState(false);

  const saveCard = async () => {
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
        setTextStatus("the card was not created please try again");
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
      <SingleSelect onSelect={onSelect} id={id}>
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
            <Button onClick={saveCard} color="success">
              Save Card
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton={true}>
            <Modal.Title>Create a new Card Orifinal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Description</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => cancelAction()} shape="flat" color="info">
              Cancel
            </Button>
            <Button color="danger">Update profile</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
