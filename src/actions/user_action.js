export const LoginUser = (data) => {
  console.log(data)
  return {
    type: "LOG_IN",
    payload: data
  };
};
export const LogOutUser = () => {
  return {
    type: "LOG_OUT",
  };
};
