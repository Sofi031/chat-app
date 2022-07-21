import "./Button.styles.scss";

export function Button(props) {
  const className = `button button--${props.variant}`;

  return (
    <button className={className} onClick={props.onClick}>
      {props.children} 
    </button>
  )
}