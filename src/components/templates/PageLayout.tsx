import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classNames from 'classnames';
import { toggleDrawer } from '@/slice/drawerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useCallback, cloneElement, useEffect } from 'react';
import { RootState } from '@/store';
import { db } from '../../../firebase';
import { setGroupId } from '@/slice/groupIdSlice';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import PageNavigation from './PageNavigation';
import Header from './Header';
import { setGroupData } from '@/slice/groupDataSlice';
import { setGroupUsers } from '@/slice/groupUsersSlice';

interface Props {
  children: ReactElement;
  current?: string | undefined | null;
  grayBg?: boolean;
}

const PageLayout = (props: Props) => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.drawer.open);
  const { userId } = useSelector((state: RootState) => state.userId);
  const { groupId } = useSelector((state: RootState) => state.groupId);

  const handleToggleDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  // グループ取得
  const fetchData = useCallback(async (): Promise<void> => {
    if (!userId) return;
    // ユーザからgroupIdを取得
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    dispatch(setGroupId(userDocSnap.data()?.groupId));

    // groupからgroupデータを取得
    const groupDocRef = doc(db, 'group', userDocSnap.data()?.groupId);
    const groupDocSnap: any = await getDoc(groupDocRef);
    dispatch(setGroupData(groupDocSnap.data()));

    // groupからuserデータを取得
    const userCollectionRef = collection(
      db,
      'group',
      userDocSnap.data()?.groupId,
      'users'
    );
    const userCollectionSnap = await getDocs(userCollectionRef);
    const userData = userCollectionSnap.docs.map((doc) => doc.data());
    dispatch(setGroupUsers(userData));
  }, [dispatch, userId]);

  // ページの初期表示時にのみデータを取得
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className='flex w-full fixed '>
        <aside
          className={classNames(
            'w-1/5  bg-secondary h-screen relative flex flex-col justify-between',
            !open && 'w-16'
          )}
        >
          <div>
            <PageNavigation current={props.current} />
          </div>

          <div
            className={classNames(
              'flex justify-end p-4 border-t',
              !open && 'justify-center'
            )}
          >
            {open ? (
              <IconButton size='small' onClick={handleToggleDrawer}>
                <ArrowBackIosNewIcon />
              </IconButton>
            ) : (
              <IconButton size='small' onClick={handleToggleDrawer}>
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </div>
        </aside>
        {/* ヘッダーとchidrenを縦並び */}
        <div className='flex flex-col h-screen w-full'>
          <Header />
          <div
            className={classNames('m-6 flex-1', props.grayBg && 'bg-secondary')}
          >
            {cloneElement(props.children, { open })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
