import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { PodIcon } from "@/components/SvgIcons";

type ChatBubbleProps = {
  message: string;
  isOwnMessage: boolean;
};

export const ChatBubble = ({ message, isOwnMessage }: ChatBubbleProps) => {
  const bgColor = isOwnMessage ? "black" : "gray.200";

  return (
    <Flex w="100%" justify={isOwnMessage ? "flex-end" : "flex-start"}>
      {!isOwnMessage && <Avatar icon={<PodIcon boxSize="36px" />} mr="20px" />}
      <Box
        maxWidth="70%"
        borderWidth={1}
        borderRadius="lg"
        py={2}
        px={4}
        my={2}
        bg={bgColor}
        color={isOwnMessage ? "white" : "black"}
        alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          left: isOwnMessage ? "auto" : "-12px",
          right: isOwnMessage ? "-12px" : "auto",
          top: "12px",
          bg: bgColor,
          w: "30px",
          h: "20px",
          transform: isOwnMessage ? "rotate(-45deg)" : "rotate(45deg)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 80%)",
        }}
      >
        <Text fontSize="md">{message}</Text>
      </Box>
      {isOwnMessage && (
        <Avatar icon={<AiOutlineUser size="36px" />} ml="16px" />
      )}
    </Flex>
  );
};
