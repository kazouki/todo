import React from "react";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

export default (props) => {
  const switchSizeOf = (IconComponent) => {
    return props.size === "l" ? (
      <IconComponent style={{ fontSize: "32px" }} />
    ) : (
      <IconComponent />
    );
  };
  const switchIcon = () => {
    switch (props.icon) {
      case 1:
        return switchSizeOf(InboxIcon);
      case 2:
        return switchSizeOf(DraftsIcon);
      case 3:
        return switchSizeOf(SendIcon);
      case 4:
        return switchSizeOf(AccessAlarmIcon);
      default:
        return switchSizeOf(InboxIcon);
    }
  };
  const RenderIcon = switchIcon();

  return RenderIcon;
};
