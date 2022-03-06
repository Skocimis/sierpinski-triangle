
let skripta = {};
let ctx;
let width, height;
const SQRT3 = 1.73205080757;
const SQRT3POLA = 0.86602540378;
const SQRT3CETVRTINA = 0.43301270189;
skripta.pokreni = function handleMessageFromMain(msg) {
    let xcentra = msg.xcentra;
    let ycentra = msg.ycentra;
    let brojIteracija = msg.brojIteracija;
    let poluprecnik = msg.poluprecnik;
    let canvas = msg.canvas;
    ctx = msg.context;
    width = canvas.width;
    height = canvas.height;
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.moveTo(xcentra, ycentra - poluprecnik);
    ctx.lineTo(xcentra + poluprecnik * SQRT3POLA, ycentra + poluprecnik / 2);
    ctx.lineTo(xcentra - poluprecnik * SQRT3POLA, ycentra + poluprecnik / 2);
    ctx.lineTo(xcentra, ycentra - poluprecnik);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.moveTo(xcentra, ycentra - poluprecnik);
    ctx.lineTo(xcentra + poluprecnik * SQRT3POLA, ycentra + poluprecnik / 2);
    ctx.lineTo(xcentra - poluprecnik * SQRT3POLA, ycentra + poluprecnik / 2);
    ctx.lineTo(xcentra, ycentra - poluprecnik);
    ctx.fillStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "black";
    crtaj_fraktal(brojIteracija, xcentra, ycentra, poluprecnik, brojIteracija);

};
let crtaj_fraktal = function (dubina, x, y, r, pit) {
    if (x + r * SQRT3POLA < 0 || x - r * SQRT3POLA > width || y + r / 2 < 0 || y - r > height) {
        return;
    }
    if (r < 1.5) {
        oboj_trougao(x, y, r);
        return;
    }
    if (dubina == 0) return;
    crtaj_trougao(x, y, r);
    let deca = centrovidece(x, y, r);
    for (let i in deca) {
        crtaj_fraktal((dubina != -1) ? (dubina - 1) : -1, deca[i].x, deca[i].y, r / 2, pit)
    }
}
let crtaj_trougao = function (x, y, r) {
    ctx.beginPath();
    /*ctx.moveTo(x, y - r);
    ctx.lineTo(x + r * SQRT3POLA, y + r / 2);
    ctx.lineTo(x - r * SQRT3POLA, y + r / 2);
    ctx.lineTo(x, y - r);
    ctx.stroke();*/
    ctx.moveTo(x, y + r / 2);
    ctx.lineTo(x + r * SQRT3 / 4, y - r / 4);
    ctx.lineTo(x - r * SQRT3 / 4, y - r / 4);
    ctx.lineTo(x, y + r / 2);
    ctx.fill();
}
let oboj_trougao = function (x, y, r) {
    /*ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r * SQRT3POLA, y + r / 2);
    ctx.lineTo(x - r * SQRT3POLA, y + r / 2);
    ctx.lineTo(x, y - r);
    ctx.fill();*/
}
let centrovidece = function (x, y, r) {
    return [
        { x: x, y: y - 1 / 2 * r },
        { x: x + r * SQRT3 / 4, y: y + r / 4 },
        { x: x - r * SQRT3 / 4, y: y + r / 4 },
    ]
}