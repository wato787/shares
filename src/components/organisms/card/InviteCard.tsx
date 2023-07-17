import { RootState } from '@/store';
import { Button, Card, IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from '@/hooks/useSnackBar';

const InviteCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { groupId } = useSelector((state: RootState) => state.groupId);
  const { showSnackbar } = useSnackbar();

  const handleCopy = () => {
    navigator.clipboard.writeText(groupId as string);
    if (!groupId) {
      showSnackbar('コピーに失敗しました', 'error');
      return;
    }
    showSnackbar('コピーしました', 'success');
  };

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
        <span className='font-bold text-xl text-gray-600'>グループID表示</span>

        <div className='flex flex-col  w-full gap-y-5'>
          <span className='text-gray-500 font-bold text-xs text-center'>
            グループに追加したい人にこのIDを教えてください
          </span>
          {isOpen && (
            <div className='flex items-center justify-between  bg-secondary rounded p-2'>
              <span className='text-gray-500 font-bold text-base pl-4'>
                {groupId}
              </span>
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </div>
          )}

          <Button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? '表示する' : '隠す'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InviteCard;
