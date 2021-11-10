import { FC } from "react";
import Lottie from "lottie-react";
import errorDog from "./errorDog.json";

interface Props {
  size?: string;
}

const Loader: FC<Props> = ({ size = "200px" }) => {
  const styleObject = { height: size, zIndex: 50000 };
  return <Lottie animationData={errorDog} style={styleObject} />;
};

export default Loader;
