import axios from "axios";
axios.defaults.withCredentials = true;
// const token = localStorage.getItem('token')
// console.log(token + 'here')
export const getUser = async () => {
  const token = localStorage.getItem('token')
  const result = token.replace(/^"(.*)"$/, '$1');
 console.log(result)
  const config = {

    headers: {
      'Content-Type': 'application/json',
      Authorization : `Bearer ${result}`
    }

};
console.log(token)
  const  {data} = await axios.get("http://localhost:8000/api/user/profile/", config);
  return data;
};
