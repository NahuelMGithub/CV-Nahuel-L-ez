
// Si usas módulos ES, pon type="module"
document.addEventListener("DOMContentLoaded", async () => {
  // 1) Localiza la sección
  const contenedor = document.getElementById("listas-formacion");
  if (!contenedor) return;

  try {
    // 2) Trae los datos
    const res = await fetch("formacion.json");   // ← cambia la ruta si hace falta
    const datos = await res.json();

    // 3) Crea las dos columnas (col-12 en mobile, col-md-6 en desktop)
    const crearColumna = (titulo, items) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 mb-4";

      // encabezado de la lista
      const h3 = document.createElement("h3");
      h3.textContent = titulo;
      h3.className = "h5 mb-3";
      col.appendChild(h3);

      // lista
      const ul = document.createElement("ul");
      items.forEach(({ descripcion }) => {
        const li = document.createElement("li");
        li.textContent = descripcion;
        ul.appendChild(li);
      });
      col.appendChild(ul);

      return col;
    };

    // 4) Vacía lo que hubiera antes (opcional)
    contenedor.innerHTML = "";

    // 5) Inserta las columnas
    contenedor.appendChild(
      crearColumna("Formación académica", datos.formacionAcademica || [])
    );
    contenedor.appendChild(
      crearColumna("Cursos", datos.cursos || [])
    );

  } catch (err) {
    console.error("No pude cargar los datos de formación:", err);
  }
});



document.addEventListener("DOMContentLoaded", async () => {
  const habilidadesContainer = document.getElementById("habilidades-cards-container");
  const modal = new bootstrap.Modal(document.getElementById("habilidadesModal"));
  const modalTitle = document.getElementById("habilidadesModalLabel");
  const modalList = document.getElementById("habilidadesModalList");

  const response = await fetch("skills.json");
  const data = await response.json();

  const categorias = [
    { key: "herramientas", titulo: "Herramientas", imagen: "img/herramientas.jpg" },
    { key: "habilidadesBlandas", titulo: "Habilidades Blandas", imagen: "img/blandas.jpg" },
    { key: "tecnicas", titulo: "Técnicas", imagen: "img/tecnicas.jpg" }
  ];

  categorias.forEach(cat => {
    // Crear card
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${cat.imagen}" class="card-img-top imagen" alt="${cat.titulo}">
        <div class="card-body text-center">
          <h3 class="card-title">${cat.titulo}</h3>
          <button class="btn btn-primary" data-key="${cat.key}">Ver más</button>
        </div>
      </div>
    `;
    habilidadesContainer.appendChild(col);
  });

  // Delegación de eventos para abrir el modal
  habilidadesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const key = e.target.dataset.key;
      const categoria = categorias.find(c => c.key === key);
      const lista = data[key];

      modalTitle.textContent = categoria.titulo;
      modalList.innerHTML = "";

      lista.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item.descripcion;
        modalList.appendChild(li);
      });

      modal.show();
    }
  });
});

//---------------------------------------------- Interedes

document.addEventListener("DOMContentLoaded", () => {
    fetch('intereses.json')
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById('carousel-inner');
            const modalesContainer = document.getElementById('modales-intereses');

            data.forEach((interes, index) => {
                const { nombre, foto, descripcion } = interes;
                const id = nombre.toLowerCase().replace(/\s+/g, '-');

                // Crear slide del carrusel
                const slide = document.createElement('div');
                slide.className = `carousel-item${index === 0 ? ' active' : ''}`;
                slide.innerHTML = `
                    <div class="d-flex flex-column align-items-center text-center">
                        <h3 class="mt-4">${nombre}</h3>
                        <img src="${foto}" class="d-block w-75 rounded shadow" alt="${nombre}">
                        <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#modal-${id}">
                            Ver más
                        </button>
                    </div>
                `;
                carouselInner.appendChild(slide);

                // Crear modal
                const modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.id = `modal-${id}`;
                modal.tabIndex = -1;
                modal.setAttribute('aria-labelledby', `modalLabel-${id}`);
                modal.setAttribute('aria-hidden', 'true');
                modal.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel-${id}">${nombre}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                ${descripcion}
                            </div>
                        </div>
                    </div>
                `;
                modalesContainer.appendChild(modal);
            });
        })
        .catch(error => {
            console.error("Error cargando intereses.json:", error);
        });
});

//---------------------------------------- Experiencia

fetch('experiencia.json')
    .then(response => response.json())
    .then(data => {
        const experienciaContainer = document.getElementById('experiencia-container');

        data.forEach(exp => {
            const { empresa, puesto, descripcion, anioInicio, anioFin } = exp;

            const tarjeta = document.createElement('div');
            tarjeta.className = 'col-md-6';
            tarjeta.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${empresa}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${puesto}</h6>
                        <p class="card-text">${descripcion}</p>
                        <p class="text-end text-muted small">
                            ${anioInicio}${anioFin ? ' – ' + anioFin : ' – Presente'}
                        </p>
                    </div>
                </div>
            `;
            experienciaContainer.appendChild(tarjeta);
        });
    })
    .catch(error => {
        console.error("Error cargando experiencia.json:", error);
    });
