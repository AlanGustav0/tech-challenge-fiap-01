// src/app/layout.js
import '../app/globals.css';

export default function Layout({ children }) {
  return (
    <html>
      <head>
        {/* Importar SystemJS primeiro */}
        <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"></script>

        {/* Importmap inline */}
        <script
          type="systemjs-importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                "mfe-angular": "http://localhost:4200/microfrontend.js",
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
