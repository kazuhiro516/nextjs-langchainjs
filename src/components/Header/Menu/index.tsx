import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu as ChakraMenu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  VStack,
  Box,
  Text,
  type BoxProps,
} from "@chakra-ui/react";

type MenuProps = {
  children?: React.ReactNode;
} & BoxProps;

export const Menu = (props: MenuProps) => {
  return (
    <Box {...props}>
      <ChakraMenu>
        <MenuButton as={Button} w={12} h={12}>
          <VStack spacing={1} mt="20px">
            <Box boxSize="40px">
              <HamburgerIcon w={6} h={6} />
            </Box>
            <Text fontSize="sm" position="relative" top="-22px">
              Menu
            </Text>
          </VStack>
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </ChakraMenu>
    </Box>
  );
};
