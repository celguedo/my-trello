import React from "react";
import styled from "styled-components";
import Card from "emerald-ui/lib/Card";
import Label from "emerald-ui/lib/Label";
import { mapLabelPositionCard } from "../../utils";

const CardStyled = styled(Card)`
  margin-top: 20px !important;
  cursor: pointer;
`;

const DivStyled = styled.div`
  white-space: normal;
  word-break: break-word;
  position: relative;
`;

export default function CardTrello({ data, viewCard }) {
  const { label, colorLabel } = mapLabelPositionCard(data.position);

  return (
    <CardStyled onClick={() => viewCard(data)}>
      <Card.Header color={data.color}>
        <h1 className={`eui-card-header-title`}>
          <Label color={colorLabel}>{label}</Label>
        </h1>
      </Card.Header>
      <DivStyled>
        <h2 className="eui-card-title">{data.title}</h2>
        <p>
          <b>Created by: </b>
          {data.nameCreatedBy}
        </p>
      </DivStyled>
    </CardStyled>
  );
}
