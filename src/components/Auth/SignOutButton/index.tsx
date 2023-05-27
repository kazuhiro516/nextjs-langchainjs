import { Box, Button, Text } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

const SignOutButton = () => {
  const { error, signOut } = useAuth();
  return (
    <Box>
      <Button onClick={signOut}>ログアウト</Button>
      {error && <Text>{error}</Text>}
    </Box>
  );
};

export { SignOutButton };
