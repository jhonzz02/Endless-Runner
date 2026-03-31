Sou um desenvolvedor Front-end junior, este projeto é um jogo de navegador da categoria endless runner, o objetivo principal desse projeto é a revisão do basico do front-end, como html, css e JS. Foi utilizado IA para o desenvolvimento do projeto tem diversos comentarios ao longo do projeto afinal o objetivo principal era a revisão e sanar duvidas.
--------------------------------------------------
road map:
pause and continue
score 
cria um personagem e obstaculo
--------------------------------------------------
setInterval vs. requestAnimationFrame (rAF) - Aprendi que setInterval não é o ideal para criar um jogo pois ele ignora completamente os hz dos monitores ou se o navegador esta renderizando outras coisas causando os famosos stutterings. Por outro lado o requestAnimationFrame é sincronizado com os hz do monitor, pausa a execução ao mudar de aba e deixa as animações mais fluidas.

percebi tambem que é importante não trabalhar com valores fixos em todas as funções... por exemplo ao colocar um valor fixo na posição de "spawn" do obstaculo faz com que em telas menores o jogo fique muito rapido e em telas grandes fique extremamente lento. (esse parametro "window.innerWidth" esta salvando muitas partes do script)

