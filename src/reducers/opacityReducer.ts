import React from "react";

export type OpacityState = number | undefined;
export enum ActionOptions {
  UPDATE = "UPDATE",
}

export type OpacityReducerActions = {
  type: ActionOptions;
  payload: number;
};

const opacityReducer: React.Reducer<OpacityState, OpacityReducerActions> = (
  state: OpacityState,
  action: OpacityReducerActions
) => {
  switch (action.type) {
    case ActionOptions.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default opacityReducer;
