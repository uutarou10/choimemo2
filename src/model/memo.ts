export interface Memo {
  id: string;
  autherId: string;
  title: string;
  body: string;
  isPublic: boolean;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}
