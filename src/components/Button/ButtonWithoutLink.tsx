type Props = {
  text: string;
};

const ButtonWithoutLink = ({ text }: Props) => {
  return <button className="btn btn-outline btn-secondary">{text}</button>;
};

export default ButtonWithoutLink;
