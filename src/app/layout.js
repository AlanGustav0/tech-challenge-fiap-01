import '../app/globals.css';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}