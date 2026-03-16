import "./globals.css";
import { AuthContextProvider } from "./contexts/AuthContext";

export const metadata = {
  title: "Shopping List",
  description: "CPRG 306 Assignments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
