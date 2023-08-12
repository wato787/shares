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
import { CostType } from '@/utils/CostType';
import { red } from '@mui/material/colors';
import { useDeleteDialog } from '@/hooks/useDeleteDialog';

const getCostType = (costType: string): string => {
  switch (costType) {
    case CostType.FOOD:
      return '食費';
    case CostType.MISCELLANEOUS:
      return '雑費';
    case CostType.RENT:
      return '家賃';
    case CostType.WATER:
      return '水道代';
    case CostType.GAS:
      return 'ガス代';
    case CostType.UTILITIES:
      return '光熱費';
    case CostType.OTHER:
      return 'その他';
    case CostType.COMMUNICATION:
      return '通信費';

    default:
      return '';
  }
};

const CostHistory = ({ current }: Current): ReactElement => {
  const [rows, setRows] = useState<CostData[]>([]);
  const groupId = useSelector((state: RootState) => state.groupId.groupId);
  const [isLoading, setIsLoading] = useState(false);
  const { isDialogOpen, selectedItemId, openDialog, closeDialog } =
    useDeleteDialog();
  const allCostData = useSelector(
    (state: RootState) => state.costData.allCostData
  );

  const columns = [
    { field: 'createdAt', headerName: '日付', flex: 1 },
    { field: 'createdUserName', headerName: 'ユーザー', flex: 1 },
    { field: 'costType', headerName: '項目', flex: 1 },
    {
      field: 'amount',
      headerName: '費用金額',
      flex: 1,
      type: 'number',
      valueFormatter: ({ value }: any) => `${value}円`,
    },
    {
      field: 'delete',
      headerName: '削除',
      width: 10,
      renderCell: (params: GridCellParams) => {
        const handleDelete = () => {
          openDialog(params.row.id);
        };

        return (
          <>
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
          </>
        );
      },
    },
  ];

  const getAllData = useCallback(async (): Promise<void> => {
    if (!groupId) return;

    const groupDocRef = collection(db, 'group', groupId, 'cost');
    const groupQuery = query(groupDocRef, orderBy('createdAt', 'desc'));

    onSnapshot(groupQuery, (querySnapshot) => {
      const data: CostData[] = querySnapshot.docs.map((doc) => {
        const firestoreTimestamp = doc.data().createdAt;
        const isoTimestamp = firestoreTimestamp.toDate().toISOString();
        return {
          ...doc.data(),
          createdAt: isoTimestamp.slice(5, 10),
          costType: getCostType(doc.data().costType),
          amount: doc.data().amount.toLocaleString(),
        } as CostData;
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
      await deleteDoc(doc(db, 'group', groupId, 'cost', selectedItemId));
      closeDialog();
    }
  };

  return (
    <>
      <Card>
        <div className='text-center text-xl m-2 '>費用履歴</div>

        <DataGrid
          columns={columns}
          rows={rows}
          loading={isLoading}
          itemsPerPage={10}
          pagination={true}
        />
      </Card>

      {/* 削除ダイアログ */}
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

export default CostHistory;