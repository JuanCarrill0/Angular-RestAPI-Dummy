# AngularDummy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Crear una aplicación en angular que consulte a la api de prueba https://dummyjson.com  

Funcionalidades: 

1 ) Listar los productos disponibles en la api, tenga en cuenta que la consulta por defecto no pide todos los productos, las peticiones a la api deben consultar de 20 productos por petición, pero debe permitir al usuario ver los siguientes 20 productos (como un sistema de paginas)
No es necesario que se pueda elegir directamente una pagina (lo que corresponde a dar click a un número en especifico) con las opciones de siguiente y anterior es suficiente para esta practica.  
 
En este listado de productos se debe visualizar: El titulo, descripción, precio, stock y la imagen del producto.  

2) Establecer un sistema de colores que represente el stock del producto y aplicar el color al titulo dependiendo de su stock (Por ejemplo titulo rojo para los productos con menos de 10 unidades, amarillo para los que tengan entre 11 y 50 unidades, y verde para los que tengan más de 50 unidades). Adjuntar un txt con las reglas creadas para este punto, llamado colores.txt 

3) Ver los detalles de un producto: Partiendo de la lista de producto se debe permitir elegir un producto cualquiera y ver los detalles completos del mismo, lo que implica mostrar el titulo, descripcion, precio, rating, stock y las imágenes del producto (todas las que vienen en el arreglo) 

4) Sistema de carrito: Desde la lista de productos o visualización completa del producto se debe poder agregar el producto al carrito, que simplemente es una lista con los productos agregados, se debe poder agregar y eliminar productos al carrito. Nota: un producto no puede ser agregado dos veces al carrito, en tal caso solo debe aumentar la cantidad de ese producto en el carrito 

5) Completar compra: El carrito debe tener una opcion de completar compra, en la que simplemente se de muestra al usuario el total de la compra, teniendo en cuenta los artículos agregados al carrito con anterioridad 

6) Busqueda de productos: Debe permitir al usuario digitar el nombre de un producto y mostrar los productos que coincidan con el texto digitado, esta lista de búsqueda debe cumplir con los requerimientos que cumple la lista de productos general  

## English:

Functionalities:

1) List the available products from the API. Note that the default query does not fetch all the products. The API requests should retrieve 20 products per request. However, it should allow the user to view the next 20 products (like a pagination system). It is not necessary to allow the user to directly choose a specific page number. Having options for next and previous pages is sufficient for this exercise.
In this product listing, the following information should be displayed: Title, description, price, stock, and the product image.

2) Implement a color system that represents the stock of each product and apply the color to the title based on the stock. For example, use red for products with less than 10 units, yellow for products with 11 to 50 units, and green for products with more than 50 units. Please refer to the "colores.txt" file for the rules created for this point.

3)View the details of a product: Starting from the product list, allow the user to choose any product and view its complete details. This includes displaying the title, description, price, rating, stock, and images of the product (all images in the array).

4)Shopping cart system: From the product list or the full product view, allow the user to add the product to the shopping cart. The shopping cart should be a list of added products, and the user should be able to add and remove products from the cart. Note: A product cannot be added twice to the cart. In such cases, only the quantity of that product in the cart should increase.

5)Complete purchase: The shopping cart should have an option to complete the purchase. When selected, it should simply display the total cost of the purchase, taking into account the items added to the cart previously.

6)Product search: Allow the user to enter the name of a product and display the products that match the entered text. The search list should comply with the same requirements as the general product listing.
