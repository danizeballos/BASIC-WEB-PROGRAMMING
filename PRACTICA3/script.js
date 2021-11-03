var productController;

class Product
{
    constructor(nombre, precio, cantidad, descripcion) 
    {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }
}

class ProductController 
{
    constructor() 
    {
        this.txtProducto = document.getElementById('txtProducto');
        this.txtPrecio = document.getElementById('txtPrecio');
        this.txtDisponibilidad = document.getElementById('txtDisponibilidad');
        this.txtDescripcion = document.getElementById('txtDescripcion');
        this.tbBody = document.getElementById('tbBody');

        this.products = new Array();
    }

    addProduct() 
    {
        let nombre = this.txtProducto.value;
        let precio = this.txtPrecio.value;
        let cantidad  = this.txtDisponibilidad.value;
        let descripcion = this.txtDescripcion.value;

        let product = new Product(nombre, precio, cantidad, descripcion);
        this.products.push(product);

        this.showProduct();
    }

    deleteProduct(i)
    {
        this.products.splice(i, 1);
        this.showProduct();
    }

    showProduct() 
    {
        this.tbBody.innerHTML = '';
        
        for (let i in this.products) 
        {
            let product = this.products[i];
            let tr = document.createElement('tr');

            let tdNombre = document.createElement('td');
            tdNombre.innerHTML = product.nombre;

            let tdPrecio = document.createElement('td');
            tdPrecio.innerHTML = product.precio;

            let tdCantidad = document.createElement('td');
            tdCantidad.innerHTML = product.cantidad;

            let tdDescripcion = document.createElement('td');
            tdDescripcion.innerHTML = product.descripcion;

            let tdOption = document.createElement('td');
            let btnDelete = document.createElement('button');

            btnDelete.type = 'button';
            btnDelete.innerHTML = 'Delete';
            btnDelete.className = 'btn btn-primary'
            btnDelete.onclick = function()
            {
                productController.deleteProduct(i);
            }

            tdOption.appendChild(btnDelete);

            tr.appendChild(tdNombre);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdCantidad);
            tr.appendChild(tdDescripcion);
            tr.appendChild(tdOption);

            this.tbBody.appendChild(tr);
        }
    }
}

window.onload = function() 
{
    productController = new ProductController();
}