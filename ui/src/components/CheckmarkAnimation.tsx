import Lottie from 'react-lottie';
import animationData from "../../public/assets/Checkmark.json";
import {Size} from "../utils/common.constants.ts";

interface Properties {
    size?: number;
}

const CheckmarkAnimation: React.FC<Properties> = ({size}) => {

    return (
        <Lottie
            height={size || Size.icon.XL}
            width={size || Size.icon.XL}
            options={{
                animationData: animationData,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }}
        />
    );
};

export default CheckmarkAnimation;