import { Flex, Avatar, AvatarBadge, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { PodIcon } from "@/components/Svg/PodIcon";

export const ChatHeader = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" icon={<PodIcon boxSize="70px" />}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          POD
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};
