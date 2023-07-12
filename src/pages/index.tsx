import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';
import { Button, TextField } from '@mui/material';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthContext } from '@/feature/auth/AuthProvider';
import { useState } from 'react';

interface Props {
  open: boolean;
}

export default function Home({ current }: Current, props: Props) {
  const [name, setName] = useState('');
  const [groupInfo, setGroupInfo] = useState<any>({});
  const [groupName, setGroupName] = useState('');
  const { user } = useAuthContext();
  const userId: any = () => {
    if (user) {
      return user.uid;
    }
    return;
  };
  const handleCreateGroup = async () => {
    const newDocRef = await addDoc(collection(db, 'group'), {
      name: name,
    });

    const docId = newDocRef.id;

    await setDoc(doc(db, 'group', docId), { id: docId }, { merge: true });

    await setDoc(doc(db, 'users', userId, 'group', docId), {
      name: name,
      id: docId,
    });
  };

  const handleGetGroupId = async () => {
    const groupCollectionRef = collection(db, 'users', userId, 'group');
    const querySnapshot = await getDocs(groupCollectionRef);
    querySnapshot.forEach((doc) => {
      const groupData: any = doc.data();
      if (groupData.name === groupName) {
        setGroupInfo(groupData);
      }
    });
  };

  return (
    <PageLayout current={current}>
      <>
        <p>b{props.open}</p>
        <TextField value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleCreateGroup}>作成</Button>
        <TextField
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button onClick={handleGetGroupId}>グループID表示</Button>
        <p>{groupInfo.id}</p>

        {/* <Button>加入</Button> */}
      </>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  if (!query.current) {
    return {
      props: {
        current: null,
      },
    };
  }
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};
