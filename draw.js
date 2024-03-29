//seleziono elemento canvas dal DOM html
const canvas = document.querySelector('#draw')
//contestualizzo il rendering e le funzioni di disegno impostando il parametro '2d' (due dimensioni)
const ctx = canvas.getContext('2d');
//fornisco a canvas variabile le dimensioni del foglio su cui vogliamo operare
//in questo caso prendendo le dimensioni della pagina visualizzata
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//imposto il colore del disegno
ctx.strokeStyle = '#BADA55'
//determina la forma utilizzata per unire due segmenti di linea nel punto in cui si incontrano
ctx.lineJoin = 'round'
//determina la forma utilizzata per disegnare i punti finali delle linee
ctx.lineCap = 'round'
//determina la grandezza del tratto 
ctx.lineWidth = 100

//setto la variabile isDrowing al fine di poter disegnare solo quando il il click del mouse è premuto
let isDrowing = false
//setto le variabili su asse x e y
let lastX = 0
let lastY = 0
//setto la variabile per incrementare il valore che andrà a modificare il colore
let hue = 0
//setto la varaiabile per incrementare e decrementare la grandezza della linea
let direction = true

//creiamo la funzione per disegnare
function draw(e){
  if (!isDrowing) return //stoppa la fn se isDrowing rimane false
    //imposto il colore con valore dinamico
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    //creo un nuovo percorso di disegno
    ctx.beginPath();
    //inizio da
    ctx.moveTo(lastX, lastY)
    //vai a
    ctx.lineTo(e.offsetX, e.offsetY)
    //disegna il tratto
    ctx.stroke()
    //aggiorno il valore iniziale di lastX e lastY con il valore di offsetX e offsetY
    //in modo da poter iniziare a disegnare dall'ultima coordinata rilevata.
    lastX = e.offsetX
    lastY = e.offsetY
    //incremento la variabile hue per generare il colore dinamicamente
    //controllando però che non superi i 360
    hue++
    if (hue > 360){
      hue = 0
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
      direction = !direction
    }

    if (direction){
      ctx.lineWidth++
    }else{
      ctx.lineWidth--
    }
}

//addiungiamo i listener per applicare la funzione solo quando il mouse è premuto
canvas.addEventListener('mousedown', (e) => {
  isDrowing = true 
  //aggiorno il valore iniziale di lastX e lastY con il valore di offsetX e offsetY
  //in modo da poter iniziare a disegnare senza che venga tracciata una linea retta
  //da 0, 0 a offsetX e offsetY
  lastX = e.offsetX
  lastY = e.offsetY
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => { isDrowing = false })
canvas.addEventListener('mouseout', () => { isDrowing = false })
