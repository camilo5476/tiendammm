const mp = new MercadoPago('APP_USR-dd86ed69-dec6-4914-a177-4541717c9485' ,{
    locale: "es-AR"
});




let productos = [];
let productosEnCarrito;
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const contenedorProductos = document.createElement("div");
contenedorProductos.id = "contenedor-productos"
contenedorProductos.classList.add("contenedor-productos")
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");
const main = document.querySelector(".bor");
localStorage.setItem("arreglo", "")
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
        localStorage.setItem("arreglo", JSON.stringify(productos))

    });



botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
        aside.classList.remove("aside-visible");
    });
});

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            console.log(e.currentTarget.id)
            const productosBoton = productos.filter((producto, i) => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
            let productosfiltrados = [...productosBoton]
            localStorage.setItem("arreglo", JSON.stringify(productosfiltrados))
        } else {
            localStorage.setItem("arreglo", JSON.stringify(productos))
            cargarProductos(productos);
        }
    });
});

    // Agregar eventos a los botones después de que se hayan agregado al DOM



function cargarProductos(productosElegidos) {
    // Limpiar el contenedor de productos
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto, i) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <div id="qw" data-index="${i}">
                <img class="producto-imagen" src="${producto.imagen[0]}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;
        main.innerHTML = ""
        contenedorProductos.appendChild(div);
        main.appendChild(contenedorProductos)
    });

    // Actualizar los botones de agregar
    actualizarBotonesAgregar();
}


function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
    const qw = document.querySelectorAll("#qw");
    qw.forEach(bo => {
        bo.addEventListener("click", drawkp);
        
    });
}

function agregarAlCarrito(e) {
    e.stopPropagation();
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}



function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function drawkp(e) {
    let mas = 1;
    let aumento = 0;
    let get = localStorage.getItem("arreglo");
    let final = JSON.parse(get);
    const index = e.currentTarget.dataset.index;
    const pro = final[index];
    let imagenes = pro.imagen;

    console.log("Índice del producto en el array productosEnCarrito:", index);
    main.innerHTML = `
    <div class="caja-individual">
        <div id="image">
            <img class="productos" src="${imagenes[aumento]}">
            <button class="adelante"><span class="material-symbols-outlined">arrow_forward_ios</span></button>
            <button class="atras"><span class="material-symbols-outlined">arrow_back_ios</span></button>
        </div>
        <div class="producto-detalles2">
           <div class="info">
                <div class="descripciones">
                    <h2>${pro.titulo}</h2>
                    <p></p>
                </div>
                
                <div class="cantidades">
                    <button class="mas">+</button>
                    <p class="ca">${mas}</p>
                    <button class="menos">-</button>
                </div>
                <p class="precio23"></p>
                <div class="tallas-calzado">
                    <button class="talla-aumento">+</button>
                    <p class="tallas">35</p>
                    <button class="talla-decreciente">-</button>
                </div>
                
           </div>
           <div class="botones">
              <button class="prod">comprar</button>
              <div id="wallet_container"></div>
           </div>
        </div>
    </div>`;
    let tallaumento1 = 35;
    console.log(pro.categoria.id);
    if (pro.categoria.id === "calzado") {
        document.querySelectorAll(".tallas-calzado").forEach(stye => {
            stye.style.display = "flex";
        });

        const tallasAumento = document.querySelectorAll(".talla-aumento");
        tallasAumento.forEach(tallas => {
            tallas.addEventListener("click", e => {
                tallaumento1++;
                if (tallaumento1 > 43) {
                    tallaumento1 = 43;
                }
                document.querySelector(".tallas").textContent = tallaumento1;
            });
        });

        const tallasDecreciente = document.querySelectorAll(".talla-decreciente");
        tallasDecreciente.forEach(tallas => {
            tallas.addEventListener("click", e => {
                tallaumento1--;
                if (tallaumento1 < 35) {
                    tallaumento1 = 35;
                }
                document.querySelector(".tallas").textContent = tallaumento1;
            });
        });
    }

    const botonmas = document.querySelectorAll(".mas");
    botonmas.forEach((btn) => {
        btn.addEventListener("click", e => {
            console.log("se presiono el mas");
            mas++;
            if(mas > pro.numerodecantidades){
                mas = pro.numerodecantidades;
            }
            document.querySelector(".ca").textContent = mas;
            updatePrecio();
        });
    });

    const botonmenos = document.querySelectorAll(".menos");
    botonmenos.forEach((btn) => {
        btn.addEventListener("click", e => {
            console.log("se presiono el menos");
            mas--;
            if (mas < 1) {
                mas = 1;
            }
            document.querySelector(".ca").textContent = mas;
            updatePrecio();
        });
    });

    const adelante = document.querySelectorAll(".adelante");
    adelante.forEach((ade) => {
        ade.addEventListener("click", e => {
            aumento++;
            document.querySelectorAll(".productos").forEach(r => {
                if (imagenes[aumento] === undefined || aumento >= imagenes.length) {
                    aumento = 0;
                    r.src = imagenes[aumento];
                } else {
                    r.src = imagenes[aumento];
                }
            });
            updatePrecio();
        });
    });

    const atras = document.querySelectorAll(".atras");
    atras.forEach((at) => {
        at.addEventListener("click", (e) => {
            aumento--;
            document.querySelectorAll(".productos").forEach((pro) => {
                if (aumento < 0) {
                    aumento = imagenes.length - 1;
                    pro.src = imagenes[aumento];
                } else {
                    pro.src = imagenes[aumento];
                }
            });
            updatePrecio();
        });
    });

    function updatePrecio() {
        const precioUnitario = parseFloat(pro.precio);
        const cantidad = parseFloat(document.querySelector(".ca").textContent);
        const precioTotal = precioUnitario * cantidad;
        document.querySelector(".precio23").textContent = precioTotal;
    }

    const botonesProd = document.querySelectorAll('.prod');
    botonesProd.forEach(boton => {
        boton.addEventListener('click', async function(e) {
            console.log(tallaumento1)
            try{
                const orderData = {
                    title: pro.titulo,
                    quantity: mas,
                    price: pro.precio,
                    talla: tallaumento1
    
    
                };
                const response = await fetch("https://tiendammm-3.onrender.com/pago", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
    
                    },
                    body: JSON.stringify(orderData),
    
                });
    
                const preference = await response.json();
                console.log(preference, "3333333333333333");
                createCheckoutButton(preference.id);

            }catch (err){
                alert("error");

            }

      
        });
    });
}


const createCheckoutButton = (id) => {
    const renderComponent = async () => {
        if (window.CheckoutButton) {
            window.CheckoutButton.unmount()
        }

        mp.bricks().create("wallet", "wallet_container", {
            initialization: {
                preferenceId: id,
            },
            customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            },
        });

    }
    renderComponent();
}
