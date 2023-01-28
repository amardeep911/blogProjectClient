const initialState = {
  loggedIn: false,
  user: {},
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return initialState;
  }
};
export default UserReducer;
