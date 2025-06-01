import ReactDOM, { Root } from 'react-dom/client';
import ShowDialog from '@components/ui/modals/Modal';
import { Button } from '@mui/material';
import { ReactNode } from 'react';

export const openDialog = (message: string, withHomeButton?: boolean) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const buttonToMain = (): ReactNode => (
    <Button
      onClick={() => {
        window.location.href = '/';
        cleanup(root, container);
      }}
    >
      Home
    </Button>
  );

  const root = ReactDOM.createRoot(container);
  root.render(
    <>
      <ShowDialog
        message={message}
        onClose={() => cleanup(root, container)}
        additionalButton={withHomeButton && buttonToMain()}
      />
    </>
  );

  function cleanup(root: Root, container: HTMLElement) {
    root.unmount();
    document.body.removeChild(container);
  }
};
