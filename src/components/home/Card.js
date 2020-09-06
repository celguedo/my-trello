import React from "react";
import styled from "styled-components";
import Card from "emerald-ui/lib/Card";
import Label from "emerald-ui/lib/Label";
import { mapLabelPriorityCard } from "../../utils";

const CardStyled = styled(Card)`
  margin-top: 20px !important;
  cursor: pointer;
`;

const DivStyled = styled.div`
  white-space: normal;
  word-break: break-word;
  position: relative;
`;

export const LabelRight = styled(Label)`
float: right;
`;

export default function CardTrello({ data, viewCard }) {
  const { label, colorLabel } = mapLabelPriorityCard(data.priority);

  return (
    <CardStyled onClick={() => viewCard(data)}>
      <Card.Header color={data.color}>
        <h2 className={`eui-card-header-title`} style={{width: "100%"}}>
          <Label color={colorLabel}>{label}</Label>
          {!data.status && <LabelRight color="warning">Archive</LabelRight>}
        </h2>
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
