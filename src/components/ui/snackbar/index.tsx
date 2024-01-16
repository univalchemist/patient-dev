import React, { forwardRef } from 'react';
import { SnackbarMain, SnackbarElement } from 'components/ui/snackbar/styles';
import { TSnackbarProps } from 'components/ui/snackbar/types';
import { useSnackbar } from 'notistack';

const Snackbar = forwardRef<HTMLDivElement, TSnackbarProps>(
  ({ message, variant = 'info', ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleClose = () => {
      console.log('Close Notification!');
      closeSnackbar();
    };

    const handleScroll = () => {
      handleClose();
    };

    const handleClick = () => {
      handleClose();
    };

    return (
      <SnackbarMain ref={ref} {...props}>
        <SnackbarElement
          severity={variant}
          onClick={handleClick}
          onScroll={handleScroll}
        >
          {message}
        </SnackbarElement>
      </SnackbarMain>
    );
  }
);

export default Snackbar;
