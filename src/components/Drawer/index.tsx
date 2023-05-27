import {
  Drawer as ChakraDrawwer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

type DrawerProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Drawer = ({ children, isOpen, onClose }: DrawerProps) => {
  return (
    <ChakraDrawwer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Setting</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawwer>
  );
};
