import { Flex, Input, Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type FooterProps = {};

const Footer = ({}: FooterProps) => {
  const {
    register,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext();
  const values = watch();

  const isDisabled =
    values.message === "" ||
    values.message === undefined ||
    values.message === null;

  return (
    <Flex w="100%" mt="5">
      <Input
        type="text"
        border="1px solid black"
        borderRadius="6px 0 0 6px"
        _focus={{
          border: "1px solid black",
        }}
        placeholder="メッセージを入力してください"
        {...register("message", {
          required: true,
          maxLength: 100,
          minLength: 1,
        })}
      />
      <Button
        type="submit"
        bg={isDisabled ? "gray" : "black"}
        color="white"
        borderRadius="0 6px 6px 0"
        border="1px solid black"
        borderLeft={0}
        _hover={{
          bg: "white",
          color: "black",
        }}
        _disabled={{
          bg: "gray",
          color: "white",
        }}
        isDisabled={isDisabled}
      >
        送信
      </Button>
    </Flex>
  );
};

export default Footer;
