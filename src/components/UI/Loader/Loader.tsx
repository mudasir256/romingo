import Lottie from "lottie-react";
import tennisBall from "./tennisBall.json";

interface Props {
  size?: string;
}

const Loader: FC<Props> = ({ size = "200px" }) => {
  console.log(size);
  const styleObject = { height: size };
  return <Lottie animationData={tennisBall} style={styleObject} />;
};

export default Loader;
