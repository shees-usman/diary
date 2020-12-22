export interface Note {
  title: string;
  timestamp: string;
  desc: string;
  attachments: Array<{
    type: 'url' | 'img';
    desc: string;
    value: string;
  }>;
}

export const defaultNote = (): Note => ({
  title: '',
  timestamp: '',
  desc: '',
  attachments: []
});
