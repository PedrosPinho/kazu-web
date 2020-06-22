const initialState = {
  information: null
};

export const info = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INFO":
      return {
        ...state,
        information: action.payload
      };
    case "DEL_INFO":
      return {
        ...state,
        information: null
      };
    default:
      return state;
  }
};
