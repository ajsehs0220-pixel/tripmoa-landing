import { ToastProvider } from '@/components/prototype/Toast';
import { FavoritesProvider } from '@/components/prototype/FavoritesContext';
import { RecentViewProvider } from '@/components/prototype/RecentViewContext';
import { MemosProvider } from '@/components/prototype/MemosContext';
import { ChatLikesProvider } from '@/components/prototype/ChatLikesContext';
import SplashScreen from '@/components/prototype/SplashScreen';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FavoritesProvider>
      <ChatLikesProvider>
        <MemosProvider>
          <RecentViewProvider>
            <ToastProvider>
              <SplashScreen>{children}</SplashScreen>
            </ToastProvider>
          </RecentViewProvider>
        </MemosProvider>
      </ChatLikesProvider>
    </FavoritesProvider>
  );
}