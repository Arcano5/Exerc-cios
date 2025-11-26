export const metadata = {
  title: 'Lista de Tarefas',
  description: 'Aplicação de gerenciamento de tarefas com Next.js 15',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}