import { Logo } from "@/components/icons";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-6">
        <div className="flex items-center gap-2 text-primary">
          <Logo className="h-6 w-6" />
          <h1 className="font-headline text-xl font-bold">Fundify</h1>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
