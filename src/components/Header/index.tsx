import { Box } from "@chakra-ui/react";
import { Menu } from "@/components/Header/Menu/";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  return (
    <Box>
      <Menu pos="absolute" top="10px" left="10px" />
    </Box>
  );
};
