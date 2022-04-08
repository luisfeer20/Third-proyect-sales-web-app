function renderProducto({ description, price, title, id }) {
    return `<div class="card border-0">
    <div class="card-tittle planes">${title}</div>
    <div class="card-body">
       <p id="plan3Tel">${description}</p>
       <p>${price}</p>
      <button id="producto-${id}" href="#" class="btn btn-primary boton"  style="width: 100px">
        <img width="30px" height="30px" src="/imagenes/add-to-cart.png">
      </button>
    </div>`;
}
function renderCarrito({ description, price }) {
    return `<div id="carrito" class="card-text planes"> ${description} ${price} </div>`
}
$(document).ready(function () {
    const planes = [
        { id: 1, title: 'Plankemellama 1', description: 'Plan de 15GB + 200 minutos a todas las compañias', price: 'Q 100.99', type: 1 },
        { id: 2, title: 'Plankemellama 2', description: 'Plan de 25GB + 300 minutos a todas las compañias', price: 'Q 200.50', type: 1 },
        { id: 3, title: 'Plankemellama 3', description: 'Plan de 35GB + 400 minutos a todas las compañias', price: 'Q 300.33', type: 1 },
        { id: 4, title: 'Plankemellama 1', description: '25 Mbps de descarga + 5 Mbps de carga + Telefonia fija sin limites a todas las compañias', price: 'Q 150.80', type: 2 },
        { id: 5, title: 'Plankemellama 2', description: '35 Mbps de descarga + 10 Mbps de carga + Telefonia fija sin limites a todas las compañias', price: 'Q 250.95', type: 2 },
        { id: 6, title: 'Plankemellama 3', description: '45 Mbps de descarga + 15 Mbps de carga + Telefonia fija sin limites a todas las compañias', price: 'Q 350.65', type: 2 },
        { id: 7, title: 'Plankemellama 1', description: '80 canales en SD + 20 canales en HD + 6 Meses de cortesia en plataformas de streaming', price: 'Q 200.45', type: 3 },
        { id: 8, title: 'Plankemellama 2', description: '127 canales en SD + 40 canales en HD + 12 Meses de cortesia en plataformas de streaming', price: 'Q 300.75', type: 3 },
        { id: 9, title: 'Plankemellama 3', description: '129 canales en SD + 70 canales en HD + 18 Meses de cortesia en plataformas de streaming', price: 'Q 400.10', type: 3 },

    ];
    const planesTel = planes.filter(function (value) {
        return value.type === 1
    })
    for (let i = 0; i < planesTel.length; i++) {
        $('#planes-telefonia').append(renderProducto({
            title: planesTel[i].title,
            description: planesTel[i].description,
            price: planesTel[i].price,
            id: planesTel[i].id
        }));
    }

    const planesInt = planes.filter(function (value) {
        return value.type === 2;
    })
    for (let i = 0; i < planesInt.length; i++) {
        $('#planes-internet').append(renderProducto({
            title: planesInt[i].title,
            description: planesInt[i].description,
            price: planesInt[i].price,
            id: planesInt[i].id
        }
        ))
    }

    const planesTv = planes.filter(function (value) {
        return value.type === 3;
    })
    for (let i = 0; i < planesTv.length; i++) {
        $('#planes-tv').append(renderProducto({
            title: planesTv[i].title,
            description: planesInt[i].description,
            price: planesTv[i].price,
            id: planesTv[i].id
        }))
    }
    const quetzales = []
    const arrD = []
    $('button').click(function () {
        const botonP = $(this).attr('id').split("-")
        const carriF = planes.find(function (value) {
            return value.id === Number(botonP[1])
        })
        $('#carrito').append(renderCarrito({
            description: carriF.description,
            price: carriF.price
        }))
        const qynumb = carriF.price
        const arrQ = qynumb.split(' ')
        const numQ = Number(arrQ[1])
        quetzales.push(numQ)
        let suma = 0;
        for (let i = 0; i < quetzales.length; i++) {
            suma += quetzales[i]
        }
        if (carriF.type === 1) {
            $('#planes-telefonia .boton').prop('disabled', true)
        }
        if (carriF.type === 2) {
            $('#planes-internet .boton').prop('disabled', true)
        }
        if (carriF.type === 3) {
            $('#planes-tv .boton').prop('disabled', true)
        }
        $('#total').html('Q' + suma.toFixed(2))
        const desc10 = suma - (10 * suma / 100)
        const desc20 = suma - (20 * suma / 100)
        arrD.push(botonP[1])
        if (arrD.length === 2) {
            $('#descuento').html('10% ' + String(desc10.toFixed(2)))
        }
        if (arrD.length === 3) {
            $('#descuento').html('20% ' + String(desc20.toFixed(2)))
        }
    })
})