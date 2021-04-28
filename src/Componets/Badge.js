import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
// import MailIcon from "@material-ui/icons/Mail";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleBadge(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={props.childLength} color="primary">
        <ChatBubbleIcon />
      </Badge>
    </div>
  );
}
