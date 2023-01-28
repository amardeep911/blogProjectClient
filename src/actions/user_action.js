export const LoginUser = (data) => {
  return {
    type: "LOG_IN",
    payload: {
      user: data,
    },
  };
};
export const LogOutUser = () => {
  return {
    type: "LOG_OUT",
  };
};
