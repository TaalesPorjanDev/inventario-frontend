import { Outlet } from 'react-router-dom';
import { Menu } from './Menu';
import { Toast } from './Toast';
import { useToastStore } from '../store/toastStore';

export function Layout() {
  const { message, type, visible, hideToast } = useToastStore();
  return (
    <>
      <Menu />
      {visible && <Toast message={message} type={type} onClose={hideToast} />}
      <Outlet />
    </>
  );
}
