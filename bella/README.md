# Bella — Sitio web, tienda digital y kit de marketing

**Bella** es una marca de moda, belleza y bienestar femenino cuya misión es ayudar a
cada mujer a sentirse hermosa, segura y elegante, con productos de excelente calidad a
precios accesibles.

> **Eslogan:** Siéntete hermosa. Siéntete segura. Siéntete Bella.

![Logo Bella](assets/bella-logo.svg)

## Contenido

```
bella/
├── index.html                       tienda online completa (HTML + CSS + JS, sin dependencias)
├── assets/
│   ├── bella-monogram.svg           monograma "B" con pétalo (favicon / app icon)
│   └── bella-logo.svg               lockup horizontal: monograma + wordmark
└── marketing/
    ├── branding.md                  eslogan, paleta, tipografías, manual básico de marca
    ├── redes-sociales.md            Facebook, Instagram (Reels/Stories/carruseles) y TikTok
    ├── campanas-publicitarias.md    anuncios para Meta Ads y TikTok Ads
    ├── descripciones-productos.md   fichas de producto listas para la tienda
    ├── correos-electronicos.md      bienvenida, lanzamientos, carrito abandonado, VIP…
    ├── whatsapp-business.md         mensajes automáticos, respuestas rápidas, post-venta
    ├── seo.md                       meta títulos, descripciones, keywords y URLs
    ├── calendario-contenido.md      calendario mensual + fechas especiales + concursos
    └── promociones.md               Black Friday, Día de la Madre, 2×3, liquidaciones…
```

## El sitio web (`index.html`)

Página única en español con todas las secciones de una tienda online:

- **Inicio** — banner con eslogan, botones de compra y barra de beneficios.
- **Categorías** — vestidos, fajas y prendas reductoras, blusas, jeans, ropa elegante,
  bisutería, carteras y cosméticos.
- **Tienda digital** — catálogo de 8 productos, carrito lateral con cantidades, total en
  vivo, persistencia en `localStorage` y checkout de demostración (no procesa pagos reales).
- **Sobre nosotros** — la historia de Bella contada de forma emocional.
- **¿Por qué elegir Bella?** — calidad, envíos, atención, selección, garantía y tendencia.
- **Testimonios** — reseñas realistas de clientas.
- **Preguntas frecuentes** — envíos, cambios, devoluciones, pagos, garantías y tallas.
- **Contacto** — invitación cálida con botón directo a WhatsApp, correo y redes.

Se abre directo en cualquier navegador — no requiere servidor ni build.

## Identidad visual

Monograma "B" con terminaciones en pétalo y degradado **rosa–coral–dorado** sobre
berenjena profundo. Paleta, tipografías y reglas de uso en
[`marketing/branding.md`](marketing/branding.md).
