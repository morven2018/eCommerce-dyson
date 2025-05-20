import ReactDOM, { Root } from 'react-dom/client';
import ShowDialog from '@components/ui/modals/Modal';

export const openDialog = (message: string) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(
    <ShowDialog message={message} onClose={() => cleanup(root, container)} />
  );

  function cleanup(root: Root, container: HTMLElement) {
    root.unmount();
    document.body.removeChild(container);
  }
};
