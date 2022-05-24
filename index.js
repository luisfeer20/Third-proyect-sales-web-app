function renderProducto({ description, price, title, id }) {
    return `<div class="card border-0">
    <div class="card-tittle planes">${title}</div>
    <div class="card-body">
       <p>${description}</p>
       <p>Q ${price}</p>
      <button id="producto-${id}" href="#" class="btn btn-primary boton boton-producto"   style="width: 100px">
        <img width="30px" height="30px" src="/imagenes/add-to-cart.png">
      </button>
    </div>`;
}
function renderCarrito({ description, price }) {
    return `<div id="carrito" class="card-text planes"> ${description}</div>
    <div> Q ${price}</div>`
}
function renderTabla({ id, nombre, descripcion, precio, tipo }) {
    return ` <tr id = "producto-row-${id}">
    <th id="idP" scope="row">${id}</th>
    <td id="nombreP">${nombre}</td>
    <td id="descripP">${descripcion}</td>
    <td id="precioP">Q ${precio}</td>
    <td id="tipP">${tipo}</td>
    <td><button id="${id}" type="button" class="btn btn-link editar"><img width="25px" height="25px" src="/imagenes/icons8-edit-64.png"></button></td>
    <td><button id="${id}" type="button" class="btn btn-link trash"><img width="25px" height="25px" src="imagenes/icons8-remove-32.png"></button></td>
  </tr>`
}
$(document).ready(function () {
    const get = {
        "url": "http://192.168.0.6:8080/api/productos",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    };
    $.ajax(get).done(function (response) {
        const planes = response.data
        const planesTel = planes.filter(function (value) {
            return value.Tipo === 1
        })
        planesTel.forEach(element => $('#planes-telefonia').append(renderProducto({
            id: element.id,
            title: element.Nombre,
            description: element.Descripcion,
            price: element.Precio,
        })));
        const planesInt = planes.filter(function (value) {
            return value.Tipo === 2
        })
        planesInt.forEach(element => $('#planes-internet').append(renderProducto({
            id: element.id,
            title: element.Nombre,
            description: element.Descripcion,
            price: element.Precio,
        })));
        const planesTv = planes.filter(function (value) {
            return value.Tipo === 3
        })
        planesTv.forEach(element => $('#planes-tv').append(renderProducto({
            id: element.id,
            title: element.Nombre,
            description: element.Descripcion,
            price: element.Precio,
        })));
        planes.forEach(element => $('#tablaP').append(renderTabla({
            id: element.id,
            nombre: element.Nombre,
            descripcion: element.Descripcion,
            precio: element.Precio,
            tipo: element.Tipo
        })));
        $('.boton-producto').click(function () {
            let botonP = $(this).attr('id').split('-')
            let carriF = planes.find(function (value) {
                return value.id === Number(botonP[1])
            })
            $('#carrito').append(renderCarrito({
                description: carriF.Descripcion,
                price: carriF.Precio
            }))
            if (carriF.Tipo === 1) {
                $('#planes-telefonia .boton').prop('disabled', true)
            }
            if (carriF.Tipo === 2) {
                $('#planes-internet .boton').prop('disabled', true)
            }
            if (carriF.Tipo === 3) {
                $('#planes-tv .boton').prop('disabled', true)
            }
            quetzales.push(carriF.Precio)
            let suma = 0;
            for (let i = 0; i < quetzales.length; i++) {
                suma += quetzales[i]
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
    });
    let quetzales = []
    let arrD = []
    $('#enviar').click(function () {
        if ($('#planid').val() === '') {
            const settings = {
                "url": "http://192.168.0.6:8080/api/productos",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function (response) {
                        swal(response.message, " ", "success");
                    },
                    200: function (response) {
                        swal(response.message, " ", "success");
                    },
                },
                "data": JSON.stringify({
                    "nombre": $('#planname').val(),
                    "descripcion": $('#plandescription').val(),
                    "tipo": $('#plantype').val(),
                    "precio": Number($('#planprice').val()),
                }),
            };
            $.ajax(settings).done(function (response) {
                const planes = response.data
                console.log(planes);
                $('#tablaP').append(renderTabla({
                    id: planes.id,
                    nombre: planes.Nombre,
                    descripcion: planes.Descripcion,
                    precio: planes.Precio,
                    tipo: planes.Tipo
                }))
            })
        } else {
            const update = {
                "url": "http://192.168.0.6:8080/api/productos",
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function (response) {
                        swal(response.message, " ", "success");
                    },
                    200: function (response) {
                        swal(response.message, " ", "success");
                    },
                },
                "data": JSON.stringify({
                    "nombre": $('#planname').val(),
                    "descripcion": $('#plandescription').val(),
                    "precio": Number($('#planprice').val()),
                    "tipo": Number($('#plantype').val()),
                    "id": Number($('#planid').val()),
                }),
            };
            $.ajax(update).done(function (data) {
                const planes = data.data
                console.log()
                $(`#producto-row-${planes[4]}`).html(`
                <th id="idP" scope="row">${planes[4]}</th>
                <td id="nombreP">${planes[0]}</td>
                <td id="descripP">${planes[1]}</td>
                <td id="precioP">Q ${planes[2]}</td>
                <td id="tipP">${planes[3]}</td>
                <td><button id="${planes[4]}" type="button" class="btn btn-link editar"><img width="25px" height="25px" src="/imagenes/icons8-edit-64.png"></button></td>
                <td><button id="${planes[4]}" type="button" class="btn btn-link trash"><img width="25px" height="25px" src="imagenes/icons8-remove-32.png"></button></td>
                `)
            })
        }
    })
    $(document).on('click', '.editar', function () {
        const boton = $(this).attr('id')
        const nameT = $('#planname')
        const descripT = $('#plandescription')
        const typeT = $('#plantype')
        const priceT = $('#planprice')
        const idT = $('#planid')
        $.ajax(get).done(function (response) {
            const planes = response.data
            for (let i = 0; i < planes.length; i++)
                if (planes[i].id === Number(boton)) {
                    const name = planes[i].Nombre;
                    const description = planes[i].Descripcion;
                    const type = planes[i].Tipo;
                    const price = planes[i].Precio
                    const id = planes[i].id
                    nameT.val(name)
                    descripT.val(description)
                    typeT.val(type)
                    priceT.val(price)
                    idT.val(id)
                }
            $('#planname').prop('disabled', false)
            $('#plandescription').prop('disabled', false)
            $('#plantype').prop('disabled', false)
            $('#planprice').prop('disabled', false)
            $('#planid').prop('disabled', false)
            $('#enviar').prop('disabled', false)
            $('#eliminar').prop('disabled', true)
        })
    });
    $('#eliminar').click(function () {
        const eliminar = {
            "url": "http://192.168.0.6:8080/api/productos",
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function (response) {
                    swal(response.message, " ", "success");
                },
                200: function (response) {
                    swal(response.message, " ", "success");
                },
            },
            "data": JSON.stringify({
                "id": Number($('#planid').val()),
            }),
        }
        $.ajax(eliminar)
    })
    $(document).on('click', '.trash', function () {
        const boton = $(this).attr('id')
        const nameT = $('#planname')
        const descripT = $('#plandescription')
        const typeT = $('#plantype')
        const priceT = $('#planprice')
        const idT = $('#planid')
        $.ajax(get).done(function (response) {
            const planes = response.data
            for (let i = 0; i < planes.length; i++)
                if (planes[i].id === Number(boton)) {
                    const name = planes[i].Nombre;
                    const description = planes[i].Descripcion;
                    const type = planes[i].Tipo;
                    const price = planes[i].Precio
                    const id = planes[i].id
                    nameT.val(name)
                    descripT.val(description)
                    typeT.val(type)
                    priceT.val(price)
                    idT.val(id)
                }
        })
        $('#planname').prop('disabled', true)
        $('#plandescription').prop('disabled', true)
        $('#plantype').prop('disabled', true)
        $('#planprice').prop('disabled', true)
        $('#planid').prop('disabled', true)
        $('#enviar').prop('disabled', true)
    });
})