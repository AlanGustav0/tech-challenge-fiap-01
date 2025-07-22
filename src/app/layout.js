import "../app/globals.css";
import Providers from "./providers";

export default function Layout({ children }) {
  return (
    <html>
      <head>
        {/* Importar SystemJS primeiro */}
        <script
          src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"
          async
        ></script>

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
          async
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
