export function chatReducer(
  state = {
    isChatOpen: false,
  },
  action
) {
  switch (action.type) {
    case "GET_CHAT_VALUE":
      return {
        ...state,
        isChatOpen: action.data,
      };
    default:
      return state;
  }
}

export default chatReducer;
