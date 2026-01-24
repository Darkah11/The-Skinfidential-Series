// import { BundleBuilder } from "firebase-admin/firestore";
// import { text } from "stream/consumers"

interface ButtonProp {
  text?: string;
  style?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrimaryButton = ({ text, style, handleClick }: ButtonProp) => {
  return (
    <button
      onClick={handleClick}
      className={` ${style} text-sm font-semibold text-white px-5 h-[40px] flex justify-center items-center`}
    >
      {text}
    </button>
  );
};
export const GoldButton = ({ text, style }: ButtonProp) => {
  return (
    <button
      className={` ${style} text-sm text-primary-100 font-semibold bg-gold px-5 h-[40px]`}
    >
      {text}
    </button>
  );
};
export const OutlineButton = ({ text, style }: ButtonProp) => {
  return (
    <button
      className={` ${style} text-sm px-5 h-[40px] bg-transparent border font-medium border-primary-100 text-primary-100`}
    >
      {text}
    </button>
  );
};
export const AddToCartBtn = ({ style, handleClick }: ButtonProp) => {
  return (
    <button
      onClick={handleClick}
      className={` ${style} text-white text-sm font-medium py-5 w-full px-5 rounded-full bg-primary-100 `}
    >
      Add To Cart
    </button>
  );
};
