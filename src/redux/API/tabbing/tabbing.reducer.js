export function tabbingReducer(
  state = {
    tabbingValue: 0,
  },
  action
) {
  switch (action.type) {
    case "GET_TABBING_VALUE":
      return {
        ...state,
        tabbingValue: action.data,
      };
    default:
      return state;
  }
}

export default tabbingReducer;
