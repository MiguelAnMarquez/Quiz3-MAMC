
var movies
var movieCounter = 0

function extractAPIData() {
    console.log("Extrayendo Elementos");
    select = document.getElementById('MovieSelect');
    var url = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=GNHBdqObiAl8xjNhBRQK2HPYFFr3DxOM';
    /* Se hace un fetch desde la URL*/
    fetch(url)
    .then(response => response.json())
    .then(json => {
      /* Se asegura que el JSON no retorne un error de status*/
        if (json.status == 'OK') {
          /* Se almacenan los resultados para no tener que volver a hacer un feed de la API innecesario.*/
          movies = json.results;
          /* Muestra cuentos objetos han sido guardados. */
          console.log(movies.length, "Elementos han sido extraidos.");
          /* Se crea una opcion por cada objeto en el Select, por medio de una funcion escrita en el fondo. */
          for (item of movies) {
            crearOption(select, item.display_title);
          }
          
        }
    });
}

function showMovieData() {

    /* Encuentra el combobox en el documento y muestra su valor. */
    select = document.getElementById('MovieSelect');
    console.log("Objeto:", select.value);

  if (select.value >= 0) {
    /* Mira a ver si ya existe una tabla con esa ID, y la borra para hacer una nueva consulta. */
    if (document.getElementById('MovieTable') != null) {
      oldTable = document.getElementById('MovieTable');
      oldTable.parentNode.removeChild(oldTable);
    }
  
    /* Se crea la tabla con la ID MovieTable*/
    var movieTable = document.createElement('table');
    movieTable.border = "1";
    movieTable.id = "MovieTable";

    var Row0 = document.createElement('tr');
    var th = document.createElement('th');
 
   /* Aqui utilizo un loop for para crear los headers de cada pelicula
      De manera un poco mas eficiente.. o no se, a mi por lo menos eso me parece :p */
    for (let i = 0; i < 8; i++) {
      th = document.createElement('th');
      switch (i) {
        case 0:
            th.innerText = "Título de la Película";
          break;
        case 1:
            th.innerText = "Calificación MPAA ";
          break;
        case 2:
            th.innerText = "Elección de los Críticos";
          break;
        case 3:
            th.innerText = "Titular";
          break;
        case 4:
            th.innerText = "Resumen Corto";
          break;
        case 5:
            th.innerText = "Fecha de Publicación";
          break;
        case 6:
            th.innerText = "Enlace / Link (URL)";
          break;
        case 7:
            th.innerText = "Multimedia";
          break;
        default:
          console.log("The table wasn't created correctly :(");
        }
      /* Se inserta cada header en la tabla :) */
      Row0.appendChild(th);
    }
    /* Se crea la primera fila de la tabla. */
    var Row1 = document.createElement('tr');

    /* A continuacion se crean los nodos de texto basico utilizando una función: */
    /* Celda del Titulo de la Pelicula */
    var td = crearNodoDeTextoCentrado(movies[select.value].display_title);
    Row1.appendChild(td);

    /* Celda de la Calificacion MPAA */
    var td = crearNodoDeTextoCentrado(movies[select.value].mpaa_rating);
    Row1.appendChild(td);

    /* Celda de la Eleccion de los Criticos*/
    var td = crearNodoDeTextoCentrado(movies[select.value].critics_pick);
    Row1.appendChild(td);

     /* Celda del Titular*/
    var td = crearNodoDeTextoCentrado(movies[select.value].headline);
    Row1.appendChild(td);

    /* Celda del Resumen de la Pelicula*/
    var td = crearNodoDeTextoCentrado(movies[select.value].summary_short);
    Row1.appendChild(td);

    /* Celda de la Fecha de la Pelicula*/
    var td = crearNodoDeTextoCentrado(movies[select.value].publication_date);
    Row1.appendChild(td);

    /* Celda del Link a la Pelicula*/
    td = document.createElement('td');
    hText = document.createTextNode(movies[select.value].link.url);
    a = document.createElement('a')
    a.href = movies[select.value].link.url
    a.appendChild(hText)
    td.appendChild(a);
    td.style.textAlign = "center";
    Row1.appendChild(td);

    /* Celda de Multimedia (Imagen y Tamaño) */
    td = document.createElement('td');
    var ul = document.createElement('ul');
      /* Nos aseguramos que no sea nulo, sino se muestra el mensaje Indefinido.*/
      if (movies[select.value].multimedia != null) {
        var li = document.createElement('li');
        li.innerText = movies[select.value].multimedia.height + " x "+ movies[select.value].multimedia.width;
        ul.appendChild(li);
        li = document.createElement('li');
        li.appendChild(crearImagen(movies[select.value].multimedia.src, movies[select.value].multimedia.width, movies[select.value].multimedia.height))
        ul.appendChild(li);
        td.appendChild(ul);
        td.style.textAlign = "center";
        } else {
          td.innerText = "indefinido";
        }
    Row1.appendChild(td)

    /* Se agregan ambas filas ( Cabecera y fila de la Pelicula consultada ) a la tabla, y esta se inserta en el body del HTML. */
    movieTable.appendChild(Row0);
    movieTable.appendChild(Row1);
    document.body.appendChild(movieTable);
  }
  else {
    /* Se muestra una alerta si no se elije una pelicula valida. */
    alert("Por favor elija un valor valido para consultar.")
  }
}

function crearElemento(nombreTag){
  return document.createElement(nombreTag);
}

function crearImagen(urlImagen, width, height) {
  var img = crearElemento("img");
  img.src = urlImagen;
  img.style.width = width;
  img.style.height = height;
  return img;
}

function crearOption(selectID, name) {
  var newOption = document.createElement('option');
  var insertedText = document.createTextNode(name);
  newOption.value = movieCounter;
  newOption.appendChild(insertedText);
  selectID.appendChild(newOption);
  movieCounter++;
}

function crearNodoDeTextoCentrado(Text) {
  var td = document.createElement('td');
  var hText = document.createTextNode(Text);
  td.appendChild(hText);
  td.style.textAlign = "center";
  return td;
}