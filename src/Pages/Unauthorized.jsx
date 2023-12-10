import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <>
            <h1>403 Unauthorized</h1>
            <br />
            <p>You do not have permission. GO AWAY!!</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go back</button>
            </div>
        </>
    )
}

export default Unauthorized;