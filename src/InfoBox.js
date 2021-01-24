import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ casesType, title, cases, total, active, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${
        active ? "infoBox--selected" : ""
      } infoBox--${casesType}`}
    >
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>

        <h2
          className={`infoBox__cases ${
            title === "Recovered" && "infoBox__cases--recovered "
          }${title === "Deaths" && " infoBox__cases--deaths"}`}
        >
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
