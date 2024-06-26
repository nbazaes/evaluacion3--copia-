import { getAll, remove, save, selectOne, update } from "./firestore.js"
let id = ''
/* addEventListener permite invocar eventos(click, change,blur) */
document.getElementById('btnSave').addEventListener('click', () => {
    document.querySelectorAll('.formt-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const persona = {
            codBanda: document.getElementById('codBanda').value,
            nombre: document.getElementById('nombre').value,
            pais: document.getElementById('pais').value,
            fecha: document.getElementById('fecha').value,
            genero: document.getElementById('genero').value,
            fono: document.getElementById('fono').value,
            sueldo: document.getElementById('sueldo').value
        }
        /* si el id es vacio se guarda */


        if (id == '') {
            getAll(datos => {

                /* recorriendo la coleccion de documentos, para mostrar uno a uno los documentos en la tabla */
                datos.forEach(doc => {
                    /* asigna el documento a la variable item (los valores están en data() ) */
                    const item = doc.data()
                    console.log(item.codBanda)
                })
            })

            save(persona)


        }

        else
            update(id, persona)
        limpiar()
        id = ''

    }
})

window.addEventListener('DOMContentLoaded', () => {
    /* getAll es la funcion que recibe la conexion de datos */
    getAll(datos => {
        let tabla = ''
        /* recorriendo la coleccion de documentos, para mostrar uno a uno los documentos en la tabla */
        datos.forEach(doc => {
            /* asigna el documento a la variable item (los valores están en data() ) */
            const item = doc.data()
            tabla += `<tr>
            <td>${item.codBanda}</td>
            <td>${item.nombre}</td>
            <td>${item.pais}</td>
            <td>${item.fecha}</td>
            <td>${item.genero}</td>
            <td>${item.fono}</td>
            <td>${item.sueldo}</td>
            <td no wrap>
            <input type="button" class="btn btn-danger" value="Eliminar" id="${doc.id}">
            <input type="button" class="btn btn-warning" value="Editar" id="${doc.id}"></td>

            </tr>`

        })
        document.getElementById('contenido').innerHTML = tabla
        /* recorrer todos los botones eliminar */
        document.querySelectorAll('.btn-danger').forEach(btn => {
            /* identificar a que boton se le hizo clicks */
            btn.addEventListener('click', () => {
                /* invocar a la funcion que permite eliminar un documento según su id */
                Swal.fire({
                    title: "¿Está seguro de eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                });

            })
        })
        /* recorrer todos los botones editar */
        document.querySelectorAll('.btn-warning').forEach(btn => {
            /* identificamos a qué botón se le hizo click 
            async y awaut permite que lafuncion espera la respuesta para seguir su ejecución*/
            btn.addEventListener('click', async () => {
                /* invocamos a la funcion que retornar el documento seleccionado */
                const emp = await selectOne(btn.id)
                /* accedemos a los datos del documento */
                const e = emp.data()
                /* asignar los datos del documento a los input */
                document.getElementById('codBanda').value = e.codBanda
                document.getElementById('nombre').value = e.nombre
                document.getElementById('pais').value = e.pais
                document.getElementById('fecha').value = e.fecha
                document.getElementById('genero').value = e.genero
                document.getElementById('fono').value = e.fono
                document.getElementById('sueldo').value = e.sueldo
                /* dejar el run de solo lectura */
                document.getElementById('codBanda').readOnly = true
                /* guardar por editar */
                document.getElementById('btnSave').value = 'Editar'
                /* Se asigna el id del documento sleeccionado a la variable */
                id = emp.id
            })
        })
    }

    )
})

/* funcion remove permite eliminar un documento según id */