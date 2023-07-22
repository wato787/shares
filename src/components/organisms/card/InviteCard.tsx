import { Button, Card, IconButton } from '@mui/material';
import { useCallback, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from '@/hooks/useSnackBar';

interface Props {
  groupId: string;
}

const InviteCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(props.groupId as string);
    if (props.groupId) {
      showSnackbar('コピーしました', 'success');
    } else {
      showSnackbar('コピーに失敗しました', 'error');
    }
  }, [props.groupId, showSnackbar]);

  return (
    <Card sx={{ height: '100%' }}>
      <div className='p-5 flex flex-col items-center justify-center gap-y-5 w-full'>
        <span className='font-bold text-xl text-gray-600'>グループID表示</span>

        <div className='flex flex-col  w-full gap-y-5'>
          <span className='text-gray-500 font-bold text-xs text-center'>
            グループに追加したい人にこのIDを渡してください
          </span>
          {isOpen && (
            <div className='flex items-center justify-between  bg-secondary rounded p-1'>
              <span className='text-gray-500 font-bold text-base pl-4'>
                {props.groupId}
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
