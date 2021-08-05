import { useSelector, useDispatch } from "react-redux";
import { dead, alive } from "../lifeSlice"
import { RootState } from "../store";

interface SquareProps {
  x: number;
  y: number;
}

let mouseDown = false

document.body.onmousedown = () => {
    mouseDown = true
}

document.body.onmouseup = () => {
    mouseDown = false
}

function Square(props: SquareProps): JSX.Element {
  const square = useSelector(
    (state: RootState) => state.life.value[props.y][props.x]
  );
  const dispatch = useDispatch();

  const handleHover = (): void => {
    if (mouseDown) {
      handleClick();
    }
  };

  const handleClick = (): void => {
    if (square === 1) {
      dispatch(dead({ x: props.x, y: props.y }));
    } else {
      dispatch(alive({ x: props.x, y: props.y }));
    }
  };

  return (
    <button
      className={square === 1 ? "square alive" : "square"}
      onClick={handleClick}
      onMouseOver={handleHover}
    ></button>
  );
}

export default Square;
