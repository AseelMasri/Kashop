import axios from "axios";
//بحاجة انه المستخدم يسجل دخوله
//const token = localStorage.getItem("userToken:")
const AxiosInstanse = axios.create({
    baseURL:`https://kashop1.runasp.net/api/Customer`,
});
export default AxiosInstanse;