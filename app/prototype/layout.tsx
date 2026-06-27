import { ToastProvider } from '@/components/prototype/Toast';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
