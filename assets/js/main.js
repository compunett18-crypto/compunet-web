/* =====================================================
       1) DATOS DEL CATÁLOGO
       Aquí definimos los productos que aparecerán.
       ===================================================== */
    const catalogo = [
      {
        id: 1,
        nombre: 'Konica Minolta bizhub 4750',
        marca: 'Konica Minolta',
        sku: 'bizhub 4750',
        categoria: 'impresoras',
        precio: 19000,
        desc: 'Multifuncional monocromática con hasta 50 ppm, impresión PCL/PS integrada y soporte para entornos de red.'
      },
      {
        id: 2,
        nombre: 'HP LaserJet Managed E50145dn',
        marca: 'HP',
        sku: 'E50145dn',
        categoria: 'impresoras',
        precio: null,
        desc: 'Impresora monocromática con hasta 43 ppm estándar, dúplex automático y memoria base de 1 GB expandible.'
      },
      {
        id: 3,
        nombre: 'HP Color LaserJet Managed MFP E67550dh',
        marca: 'HP',
        sku: 'E67550dh',
        categoria: 'impresoras',
        precio: null,
        desc: 'Multifuncional color con funciones de impresión, copia y escaneo, escaneo dúplex de una sola pasada y flujo de trabajo de alto volumen.'
      },
      {
        id: 4,
        nombre: 'HP LaserJet Managed MFP E42540',
        marca: 'HP',
        sku: 'E42540',
        categoria: 'impresoras',
        precio: null,
        desc: 'Multifuncional monocromática con pantalla táctil a color, memoria base de 2 GB y enfoque en oficina de alto rendimiento.'
      },
      {
        id: 5,
        nombre: 'HP LaserJet Enterprise M4555',
        marca: 'HP',
        sku: 'M4555',
        categoria: 'impresoras',
        precio: null,
        desc: 'Equipo multifuncional monocromático con hasta 52 ppm, resolución de hasta 1200 x 1200 dpi y pantalla táctil a color de 20.5 cm.'
      },
      {
        id: 6,
        nombre: 'HP PageWide Managed Color MFP E58650dn',
        marca: 'HP',
        sku: 'E58650dn',
        categoria: 'impresoras',
        precio: null,
        desc: 'Multifuncional color PageWide con hasta 50 ppm, ADF de 100 hojas y escaneo dúplex de una sola pasada.'
      }
    ];

    /* =====================================================
       2) RUTAS DE IMÁGENES
       Estas imágenes deben existir en assets/catalogo/
       con estos nombres exactos.
       ===================================================== */
    const realImagesPaths = [
      'assets/catalogo/catalogo_img_01.png',
      'assets/catalogo/catalogo_img_02.png',
      'assets/catalogo/catalogo_img_03.png',
      'assets/catalogo/catalogo_img_04.png',
      'assets/catalogo/catalogo_img_05.png',
      'assets/catalogo/catalogo_img_06.png'
    ];

    /* =====================================================
       3) REFERENCIAS A ELEMENTOS HTML
       Guardamos en variables los elementos que usaremos.
       ===================================================== */
    const grid = document.getElementById('grid');
    const tpl = document.getElementById('card-template');
    const search = document.getElementById('search');
    const filter = document.getElementById('filter');

    /* Imágenes de respaldo si alguna ruta falla */
    const placeholders = [
      'https://images.unsplash.com/photo-1581362062541-c9236f2b0a46?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542623024-a797a755b8a4?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557825835-70d97c4aa2d7?q=80&w=1600&auto=format&fit=crop'
    ];

    /* =====================================================
       4) FUNCIÓN getImageForIndex
       Devuelve la imagen real si existe.
       Si no, devuelve un placeholder.
       ===================================================== */
    function getImageForIndex(idx) {
      return realImagesPaths[idx] || placeholders[idx % placeholders.length];
    }

    /* =====================================================
       5) FUNCIÓN pintar
       Recibe una lista de productos y genera sus tarjetas.
       ===================================================== */
    function pintar(items) {
      /* Limpiamos el contenedor antes de volver a dibujar */
      grid.innerHTML = '';

      items.forEach(p => {
        /* Clonamos la plantilla HTML de la tarjeta */
        const card = tpl.content.cloneNode(true);

        /* Encontramos el índice del producto actual */
        const idx = catalogo.findIndex(x => x.nombre === p.nombre);

        /* Asignamos imagen y textos */
        card.querySelector('img').src = getImageForIndex(idx);
        card.querySelector('.name').textContent = p.nombre;
        card.querySelector('.brand').textContent = p.marca;
        card.querySelector('.sku').textContent = p.sku ? `SKU: ${p.sku}` : '';
        card.querySelector('.category').textContent = p.categoria;
        card.querySelector('.desc').textContent = p.desc;

        /* Mostramos precio o la palabra Cotiza */
        card.querySelector('.price').textContent = (typeof p.precio === 'number')
          ? `$${p.precio.toLocaleString('es-MX')} MXN`
          : 'Cotiza';

        /* Cuando den clic en Cotizar, llenamos el textarea */
        card.querySelector('[data-action="cotizar"]').addEventListener('click', () => {
          document.querySelector('#quoteForm textarea[name="mensaje"]').value =
            `Cotización del artículo: ${p.nombre}${p.sku ? ` (${p.sku})` : ''}`;

          /* Bajamos automáticamente al formulario */
          document.getElementById('quoteForm').scrollIntoView({ behavior: 'smooth' });
        });

        /* Agregamos la tarjeta terminada al contenedor */
        grid.appendChild(card);
      });
    }

    /* =====================================================
       6) FUNCIÓN filtrar
       Filtra productos por texto y categoría.
       ===================================================== */
    function filtrar() {
      const q = (search?.value || '').toLowerCase();
      const cat = filter?.value || '';

      const items = catalogo.filter(p => {
        const matchTexto = (p.nombre + ' ' + p.marca + ' ' + p.sku + ' ' + p.categoria)
          .toLowerCase()
          .includes(q);

        const matchCat = !cat || p.categoria === cat;

        return matchTexto && matchCat;
      });

      /* Pintamos solo los productos filtrados */
      pintar(items);
    }

    /* Eventos del buscador y filtro */
    search?.addEventListener('input', filtrar);
    filter?.addEventListener('change', filtrar);

    /* Pintamos el catálogo al cargar */
    pintar(catalogo);

    /* =====================================================
       7) FORMULARIO DE COTIZACIÓN
       No envía correo todavía.
       Abre WhatsApp con el mensaje armado.
       ===================================================== */
    document.getElementById('quoteForm').addEventListener('submit', (e) => {
      /* Evitamos el envío tradicional del formulario */
      e.preventDefault();

      /* Tomamos todos los datos del formulario */
      const data = Object.fromEntries(new FormData(e.target));

      /* Construimos el mensaje para WhatsApp */
      const msg = encodeURIComponent(
        `Hola COMPUNET, soy ${data.nombre}.\n` +
        `Correo: ${data.correo}\n` +
        `Tel: ${data.telefono}\n` +
        `Servicio: ${data.servicio}\n` +
        `Mensaje: ${data.mensaje}`
      );

      /* Número correcto de WhatsApp */
      const wa = `https://wa.me/525569680060?text=${msg}`;

      /* Mensaje visual al usuario */
      const status = document.getElementById('formStatus');
      status.innerHTML =
        `✔️ Gracias, ${data.nombre}. Te contactaremos enseguida. ` +
        `También puedes <a class="text-cyan-600 underline" target="_blank" href="${wa}">enviarnos este mensaje por WhatsApp</a>.`;

      /* Limpiamos el formulario */
      e.target.reset();

      /* Abrimos WhatsApp en otra pestaña */
      window.open(wa, '_blank');
    });

    /* =====================================================
       8) AÑO AUTOMÁTICO DEL FOOTER
       ===================================================== */
    document.getElementById('year').textContent = new Date().getFullYear();