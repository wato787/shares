import { useAuthContext } from "@/feature/auth/authProvider";
import { Avatar, Box, Button, Card, TextField } from "@mui/material";

const InputCard = () => {
  const { user } = useAuthContext();

  return (
    <Box
      sx={{
        backgroundColor: '#f1f1f1',
        padding: '1rem',
        maxWidth: 733,
        minWidth: 733,
      }}
    >
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', p: 1 }}>
          <Avatar
            sx={{ bgcolor: 'lightblue' }}
            aria-label='recipe'
            src={user?.photoURL as string}
          />
          <TextField id='input-with-sx' label='name' variant='standard' />円
          <Button>送信</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default InputCard;
