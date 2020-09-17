import React from "react";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

export default (props) => {
  const switchIcon = () => {
    switch (props.icon) {
      case 1:
        return <InboxIcon />;
      case 2:
        return <DraftsIcon />;
      case 3:
        return <SendIcon />;
      case 4:
        return <AccessAlarmIcon />;
      default:
        return <InboxIcon />;
    }
  };
  const RenderIcon = switchIcon();

  return RenderIcon;
};
