import { IoIosHeart } from "react-icons/io";

type FavBtnProps = {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isFav: Boolean;
};

const FavButton = (props: FavBtnProps) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {/* <IoIosHeart className={props.isFav ? "fill-red-600" : "fill-gray-200"} /> */}
      <IoIosHeart />
    </button>
  );
};

export default FavButton;
