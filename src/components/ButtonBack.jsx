import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ButtonBack({ onClick }) {
    const navigate = useNavigate();
    const navigateBack = (e) => {
        if (typeof e?.preventDeafult === "function") {
            e.preventDeafult();
        }
        if (typeof onClick === "function") {
            onClick(e);
        }
        navigate(-1);
    };

    return <Button type="back" onClick={navigateBack}>
        &larr; Back
    </Button>;
}

export default ButtonBack;