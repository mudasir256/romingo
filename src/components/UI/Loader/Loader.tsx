import { FC } from "react";
import Lottie from "lottie-react";
import tennisBall from "./tennisBall.json";

interface Props {
  size?: string;
}

const Loader: FC<Props> = ({ size = "200px" }) => {
  const styleObject = { height: size, zIndex: 50000 };
  return <Lottie animationData={tennisBall} style={styleObject} />;
};

export default Loader;
