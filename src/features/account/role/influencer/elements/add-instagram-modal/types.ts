import React from 'react';

export type AddInstagramModalProps = React.HTMLAttributes<HTMLDivElement> & {
  instagramUsername?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};
