// Interface for Note
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

// Default initializer to create a default Note with empty values
export const defaultNote = (): Note => ({
  title: '',
  timestamp: '',
  desc: '',
  attachments: []
});
