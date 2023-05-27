import { Box, Button, Text } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

const SignIn = () => {
  const { signInWithGithub, error } = useAuth();

  return (
    <Box>
      <Button onClick={signInWithGithub}>Github SignIn</Button>
      {error && <Text>{error}</Text>}
    </Box>
  );
};

export { SignIn };
