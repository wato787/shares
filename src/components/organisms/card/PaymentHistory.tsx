import DataGrid from '@/components/organisms/DataGrid';
import { RootState } from '@/store';
import { CostData, Current } from '@/types/type';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { GridCellParams } from '@mui/x-data-grid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import { red } from '@mui/material/colors';
import { useDeleteDialog } from '@/hooks/useDeleteDialog';

const PaymentHistory = ({ current }: Current): ReactElement => {
  const columns = [
    { field: 'createdAt', headerName: '日付', flex: 1 },
    { field: 'createdUserName', headerName: 'ユーザー', flex: 1 },
    { field: 'amount', headerName: '費用金額', flex: 1 },
    {
      field: 'delete',
      headerName: '削除',
      width: 10,
      renderCell: (params: GridCellParams) => {
        const handleDelete = () => {
          openDialog(params.row.id);
        };
        return (
          <IconButton
            aria-label='delete'
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              handleDelete();
              event.stopPropagation();
            }}
            style={{ color: red[500] }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const [rows, setRows] = useState<CostData[]>([]);
  const groupId = useSelector((state: RootState) => state.groupId.groupId);
  const [isLoading, setIsLoading] = useState(false);
  const { isDialogOpen, selectedItemId, openDialog, closeDialog } =
    useDeleteDialog();

  console.log('rows', rows);

  const getAllData = useCallback(async (): Promise<void> => {
    if (!groupId) return;

    const groupDocRef = collection(db, 'group', groupId, 'payment');
    const groupQuery = query(groupDocRef, orderBy('createdAt', 'desc'));

    onSnapshot(groupQuery, (querySnapshot) => {
      const data: any[] = querySnapshot.docs.map((doc) => {
        const firestoreTimestamp = doc.data().createdAt;
        const isoTimestamp = firestoreTimestamp.toDate().toISOString();
        return {
          createdAt: isoTimestamp.slice(5, 10),
          amount: doc.data().amount.toLocaleString() + '円',
          createdUserName: doc.data().createdUserName,
          id: doc.id,
        } as any;
      });
      setRows(data);
    });
  }, [groupId]);

  useEffect(() => {
    setIsLoading(true);
    (async (): Promise<void> => {
      await getAllData();
      setIsLoading(false);
    })();
  }, [getAllData]);

  const handleConfirmDelete = async (): Promise<void> => {
    if (groupId && selectedItemId) {
      await deleteDoc(doc(db, 'group', groupId, 'payment', selectedItemId));
      closeDialog();
    }
  };

  return (
    <>
      <Card>
        <div className='text-center text-xl m-2'>入金履歴</div>
        <DataGrid columns={columns} rows={rows} loading={isLoading} />
      </Card>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>本当に削除しますか？</DialogTitle>

        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            キャンセル
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{
              color: 'red',
              marginRight: '10px',
            }}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentHistory;
