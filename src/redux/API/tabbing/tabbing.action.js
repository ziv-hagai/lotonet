export const setGetTabbingValue = (data) => (dispatch) => {
  try {
    dispatch({ type: "GET_TABBING_VALUE", data });
  } catch (error) {
    console.error(error);
  }
};
