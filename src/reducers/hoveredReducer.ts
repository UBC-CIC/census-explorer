import { FSAType } from "@types";
import React from "react";

export type HoveredState = FSAType | undefined;
export enum ActionOptions {
  UPDATE = "UPDATE",
}

export type HoveredReducerActions = {
  type: ActionOptions;
  payload: FSAType;
};

const hoveredReducer: React.Reducer<HoveredState, HoveredReducerActions> = (
  state: HoveredState,
  action: HoveredReducerActions
) => {
  switch (action.type) {
    case ActionOptions.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default hoveredReducer;
