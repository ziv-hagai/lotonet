export const getChatValue = (data) => (dispatch) => {
  try {
    dispatch({ type: "GET_CHAT_VALUE", data });
  } catch (error) {
    console.error(error);
  }
};
