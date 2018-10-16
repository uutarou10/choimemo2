import * as firebase from 'firebase/app';
import { Memo } from 'src/model/memo';
import { db } from '../firebase';

const COLLECTION_NAME = 'memos';

export default {
  get: async (id: string): Promise<Memo> => {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    return await createMemoByDocRef(docRef);
  },

  getAll: async (): Promise<Memo[]> => {
    const querySnapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
    const result: Memo[] = [];
    querySnapshot.forEach(memo => {
      const data: any = memo.data();
      const {
        autherId,
        title,
        body,
        isPublic,
        attachments,
        createdAt,
        updatedAt
      } = data;

      result.push({
        id: memo.id,
        autherId,
        title,
        body,
        isPublic,
        attachments,
        createdAt: createdAt.toDate(),
        updatedAt: updatedAt.toDate()
      });
    });

    return result;
  },

  create: async (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ): Promise<Memo> => {
    const docRef = await db.collection(COLLECTION_NAME).add({
      autherId,
      title,
      body,
      isPublic,
      attachments,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return createMemoByDocRef(docRef);
  },

  update: async (
    id: string,
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ): Promise<Memo> => {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    await docRef.update({
      autherId,
      title,
      body,
      isPublic,
      attachments,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return await createMemoByDocRef(docRef);
  },

  delete: async (memo: Memo): Promise<void> => {
    const docRef = db.collection(COLLECTION_NAME).doc(memo.id);
    await docRef.delete();
  }
};

const createMemoByDocRef = async (docRef: firebase.firestore.DocumentReference): Promise<Memo> => {
  const doc = await docRef.get();
  const data: any = doc.data();
  const {
    autherId,
    title,
    body,
    isPublic,
    attachments,
    createdAt,
    updatedAt
  } = data;

  return {
    id: doc.id,
    autherId,
    title,
    body,
    isPublic,
    attachments,
    createdAt: createdAt.toDate(),
    updatedAt: updatedAt.toDate()
  };
};
