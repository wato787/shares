import { useAuthContext } from '@/feature/auth/AuthProvider';
import { Avatar, Box, Button, Card, TextField } from '@mui/material';

const InputCard = () => {
  const { user } = useAuthContext();

  return (
    <div className='w-1/2 '>
      <Card sx={{ height: '500px' }}>
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
    </div>
  );
};

export default InputCard;
