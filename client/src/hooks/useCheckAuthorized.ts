import { useNavigate } from "react-router-dom";
import { authorized } from "../state";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export default function useCheckAuthorized() {
    const [signedIn,] = useRecoilState(authorized);
    const navigate = useNavigate();
    useEffect(() => {
        if (!signedIn) {
            navigate('/sign-in')
        }
    }, [])
}
