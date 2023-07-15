import { useAuthContext } from '@/feature/auth/AuthProvider';
import {
  Avatar,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const InputCard = () => {
  const { user } = useAuthContext();

  return (
    <div className='w-1/3 '>
      <Card>
        <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
          <span className='font-bold text-xl text-gray-600'>出費入力</span>
          <div className='flex items-center gap-x-2'>
            <span>入力者：</span>
            <Avatar
              sx={{ width: 30, height: 30 }}
              aria-label='recipe'
              src={user?.photoURL as string}
            />
            <span>{user?.displayName}</span>
          </div>
          <form className='flex flex-col  w-full'>
            <span className='text-gray-500 font-bold text-xs mb-2'>
              出費項目
            </span>
            <div className='space-y-8'>
              <Select fullWidth>
                <MenuItem value='家賃'>家賃</MenuItem>
                <MenuItem value='雑費'>雑費</MenuItem>
                <MenuItem value='水道光熱費'>水道光熱費</MenuItem>
                <MenuItem value='ガス代'>ガス代</MenuItem>
                <MenuItem value='食費'>食費</MenuItem>
              </Select>
              <TextField
                type='number'
                id='input-with-sx'
                label='金額'
                fullWidth
              />
              <Button
                variant='outlined'
                fullWidth
                sx={{ height: 50 }}
                color='primary'
              >
                送信
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default InputCard;
