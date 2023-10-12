import axios from "./axios.config";

export const fetcher = (url) => axios.get(url).then((res) => res.data);
