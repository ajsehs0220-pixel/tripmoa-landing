import { ToastProvider } from '@/components/prototype/Toast';
import { FavoritesProvider } from '@/components/prototype/FavoritesContext';
import { RecentViewProvider } from '@/components/prototype/RecentViewContext';
import { MemosProvider } from '@/components/prototype/MemosContext';
import SplashScreen from '@/components/prototype/SplashScreen';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FavoritesProvider>
      <MemosProvider>
        <RecentViewProvider>
          <ToastProvider>
            <SplashScreen>{children}</SplashScreen>
          </ToastProvider>
        </RecentViewProvider>
      </MemosProvider>
    </FavoritesProvider>
  );
}