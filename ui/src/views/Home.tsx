import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useActiveView} from "../hooks/useActiveView.tsx";
import {View} from "../context/ActiveViewContext.tsx";

const Home: React.FC = () => {

    const navigate = useNavigate();
    const {setActiveView} = useActiveView();

    useEffect(() => {
        navigate("/recordings");
        setActiveView(View.TABLE);
    }, []);

    return (
        <></>
    );
}

export default Home;
