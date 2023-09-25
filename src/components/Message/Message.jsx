import { Text } from './Message.styled';

export const Message = ({ text, color }) => {
  return (
    <div>
      <Text color={color}>{text}</Text>
    </div>
  );
};
