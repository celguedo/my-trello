import React from "react";
import styled from "styled-components";
import Card from "emerald-ui/lib/Card";
import Label from "emerald-ui/lib/Label";

const CardStyled = styled(Card)`
  margin-top: 20px !important;
  cursor: pointer;
`;

const DivStyled = styled.div`
  white-space: normal;
  word-break: break-word;
  position: relative;
`;

export default function CardTrello({ data }) {
  let label = "",
    colorLabel = "";

  switch (data.position) {
    case "low":
      label = "Low";
      colorLabel = "default";
      break;
    case "medium":
      label = "Medium";
      colorLabel = "info";
      break;
    case "high":
      label = "High";
      colorLabel = "danger";
      break;
  }

  const viewCard = ()=>{
      console.log('Ver card');
  }

  return (
    <CardStyled onClick={viewCard}>
      <Card.Header color={data.color}>
        <h1 className={`eui-card-header-title`}>
          <Label color={colorLabel}>{label}</Label>
        </h1>
      </Card.Header>
      <DivStyled>
        <h2 className="eui-card-title">{data.title}</h2>
        <p><b>Created by: </b>{data.nameCreatedBy}</p>
      </DivStyled>
    </CardStyled>
  );
}
