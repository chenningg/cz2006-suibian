import React, { Component } from "react";
import { Switch } from "@material-ui/core";
import "../css/PreferenceItem.css";

interface PreferenceItemProps {
  preference: Preference;
}

export const PreferenceItem: React.FunctionComponent<PreferenceItemProps> = ({
  preference
}) => {
  return (
    <div className="preference">
      <p className="strip-margin">{preference.type}</p>
      <p className="strip-margin">
        <Switch></Switch>
      </p>
    </div>
  );
};
