let xJogador = [0]; 
let yJogador = [200]; 
let jogador = ["🚘"]; 
let teclas = ["w"]; 
let quantidade = jogador.length;
let fogosAtivos = false;
let fogos = [];

function setup() {
  createCanvas(460, 400);
}

function draw() { 
    ativaJogo(); 
    desenhaEstrada(); 
    desenhaLinha(); 
    desenhaLinha2(); 

    desenhaArvores();     // 🌳 Árvores no campo
    desenhaCasas();   // ✅ ADICIONE esta linha

    desenhaJogador(); 
    verificaChegada(); 
    verificaSaidaCampo(); 

    if (fogosAtivos) {
        desenhaFogos(); 
    }
} 

function ativaJogo() { 
    if (focused == true) { 
        background("#01FF0C"); 
    } 
}

function desenhaEstrada() {
  fill("#555555"); 
  rect(115, 0, 230, 400);
}

function desenhaLinha() { 
    fill("white"); 
    rect(350, 0, 10, 400); 
    fill("black"); 
    for (let yAtual = 0; yAtual < 400; yAtual += 20) { 
        rect(350, yAtual, 10, 10); 
    }
    fill("black");
    textSize(24);
    text("campo", 120, 200);
} 

function desenhaLinha2() { 
    fill("white"); 
    rect(100, 0, 10, 400); 
    fill("black"); 
    for (let yAtual = 0; yAtual < 400; yAtual += 20) { 
        rect(100, yAtual, 10, 10); 
    }
    fill("black");
    textSize(24);
    text("cidade", 270, 200);
} 

function desenhaJogador() { 
    textSize(40); 
    for (let i = 0; i < quantidade; i++) { 
        text(jogador[i], xJogador[i], yJogador[i]); 
    } 
}

function verificaChegada() {
  for (let i = 0; i < quantidade; i++) {
    if (xJogador[i] > 350 && !fogosAtivos) {
      fill("white");
      rect(5, 180, 400, 60);
      fill("black");
      textSize(20);
      text(jogador[i] + " você chegou na cidade!", 10, 200);
      text("Pressione 'r' para reiniciar", 10, 230);
      fogosAtivos = true;
      dispararFogos();
      noLoop();
    }
  }
}

function verificaSaidaCampo() {
  for (let i = 0; i < quantidade; i++) {
    if (xJogador[i] > 100 && xJogador[i] < 350) {
      let mensagem = "Você saiu do campo!";
      textSize(16);
      let larguraTexto = textWidth(mensagem);
      let alturaTexto = 20;

      fill("white");
      rect(10, 270 - alturaTexto + 4, larguraTexto + 10, alturaTexto);
      fill("black");
      text(mensagem, 15, 270);
    }
  }
}


// 🌳 Árvores no campo (apenas entre x=0 e x=100)
function desenhaArvores() {
  for (let x = 10; x < 100; x += 30) {
    for (let y = 20; y < height; y += 80) {
      fill("#8B4513"); // tronco
      rect(x + 5, y + 30, 10, 20);
      fill("#228B22"); // copa
      ellipse(x + 10, y + 30, 30, 30);
    }
  }
}

function desenhaCasas() {
  for (let x = 360; x < 460; x += 30) {
    for (let y = 20; y < height; y += 80) {
      let altura = 40;
      let yBase = y + 30;

      // Corpo da casa
      fill(random(200, 255), random(150, 200), random(150, 255));
      rect(x + 5, yBase, 20, altura);

      // Telhado
      fill(150, 75, 0);
      triangle(x, yBase, x + 15, yBase - 20, x + 30, yBase);
    }
  }
}

// 🎆 Dispara fogos de artifício
function dispararFogos() {
  for (let i = 0; i < 20; i++) {
    let fogo = {
      x: random(150, 310),
      y: random(50, 150),
      r: random(5, 10),
      cor: color(random(255), random(255), random(255)),
      tempo: random(30, 60)
    };
    fogos.push(fogo);
  }
}

// 🎇 Desenha fogos de artifício
function desenhaFogos() {
  for (let i = 0; i < fogos.length; i++) {
    let fogo = fogos[i];
    fill(fogo.cor);
    noStroke();
    ellipse(fogo.x, fogo.y, fogo.r * 2, fogo.r * 2);
    fogo.y -= 2;
    fogo.r += 0.5;
    fogo.tempo--;
  }
  fogos = fogos.filter(f => f.tempo > 0);
}

function keyPressed() { 
    for (let i = 0; i < quantidade; i++) { 
        if (key == teclas[i]) { 
            xJogador[i] += 20;  
        } 
    } 
}

function keyTyped() {
  if (key === 'r') {
    xJogador = [0];
    yJogador = [200]; 
    fogos = [];
    fogosAtivos = false;
    loop();
  }
}