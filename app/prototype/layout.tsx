import { ToastProvider } from '@/components/prototype/Toast';
import { FavoritesProvider } from '@/components/prototype/FavoritesContext';
import { RecentViewProvider } from '@/components/prototype/RecentViewContext';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FavoritesProvider>
      <RecentViewProvider>
        <ToastProvider>{children}</ToastProvider>
      </RecentViewProvider>
    </FavoritesProvider>
  );
}