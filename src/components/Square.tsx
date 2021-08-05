interface SquareProps {
  value: number
  onClick: () => void
  mouseOver: () => void
}

function Square(props: SquareProps): JSX.Element {
  return (
      <button
          className={props.value === 1 ? "square alive" : "square"}
          onClick={props.onClick}
          onMouseOver={props.mouseOver}></button>
  )
}

export default Square