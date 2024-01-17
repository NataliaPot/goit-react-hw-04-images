import { ButtonLoadMore } from './Button.styled';

const Button = ({ handleLoadMore }) => {
  return <ButtonLoadMore onClick={handleLoadMore}>Load more</ButtonLoadMore>;
};

export default Button;
