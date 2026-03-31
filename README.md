Sou um desenvolvedor Front-end junior, este projeto é um jogo de navegador da categoria endless runner, o objetivo principal desse projeto é a revisão do basico do front-end, como html, css e JS. Foi utilizado IA durante o desenvolvimento do projeto e diversos comentarios ao longo do projeto afinal o objetivo principal é aprender mais sobre o basico.

--------------------------------------------------

road map:
dificuldade progressiva ✅
score ✅
highest score (session) ✅
pause ✅
resume ✅
contagem para resume ✅
restart ✅
confirmação para restart durante a partida ✅
cria um personagem e obstaculo

-------------------------------------------------
no inicio tinhamos um quadrado verde representando o player, quadrados vermelhos representando os obstaculos e um pequeno retangulo onde o jogo acontecia

agora o jogo acontece em full screen, a dificuldade aumenta conforme a distancia percorrida, temos sistema de pontos, pause, resume, restart e highest score of the session.

setInterval vs. requestAnimationFrame (rAF) - Aprendi que setInterval não é o ideal para criar um jogo pois ele ignora completamente os hz dos monitores ou se o navegador esta renderizando outras coisas causando os famosos stutterings. Por outro lado o requestAnimationFrame é sincronizado com os hz do monitor, pausa a execução ao mudar de aba e deixa as animações mais fluidas.

percebi tambem que é importante não trabalhar com valores fixos em todas as funções... por exemplo ao colocar um valor fixo na posição de "spawn" do obstaculo faz com que em telas menores o jogo fique muito rapido e em telas grandes fique extremamente lento. (esse parametro "window.innerWidth" sera muito usado durante o projeto, ele faz com que o jogo se adapte a telas de diferentes tamanhos, dessa forma na minha função de spawnar o obstaculo temos um calculo que leva em consideração a tela do dispositivo atual)

