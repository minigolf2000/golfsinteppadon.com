import { Montserrat } from "next/font/google";
import "./layout.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>{children}</body>
    </html>
  );
}
