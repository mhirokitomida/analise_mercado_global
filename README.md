# 📊 Mercados Globais em BRL: Índices, ETFs, Alternativos e Métodos de Alocação

👉 **[🔗 Acesse o Dashboard Interativo (GitHub Pages)](https://mhirokitomida.github.io/analise_mercado_global/)**

---

## 📌 Sobre o projeto

Este projeto investiga como diferentes abordagens de construção de carteiras globais se comportam quando analisadas sob uma mesma base metodológica e convertidas integralmente para **BRL**.

A estrutura do estudo foi desenhada para separar claramente:

- 🌍 **Índices globais** como bloco analítico de referência  
- 📦 **ETFs globais** como universo investível  
- 🪙 **Alternativos** como componentes opcionais de diversificação  
- ⚖️ **Métodos de alocação** com diferentes níveis de sofisticação  

Foram comparados **quatro métodos principais** de construção de carteira:

- 🟦 **Equal Weight**  
- 📈 **Markowitz puro**  
- 📉 **Markowitz restrito**  
- 🌲 **Hierarchical Risk Parity (HRP)**  

No comparativo final, esses métodos se desdobram em **seis famílias efetivas de estratégia**, porque os blocos de Markowitz são analisados separadamente entre versões de **mínima volatilidade** e **máximo Sharpe**.

Além disso, o projeto avalia o impacto da inclusão de **ouro, petróleo e bitcoin**, observando como esses ativos alteram retorno, risco, drawdown, concentração e robustez da alocação.

---

## 🎯 Objetivo

Avaliar, de forma quantitativa e estatística, como diferentes métodos de construção de carteira se comportam em um universo global de ativos, buscando responder questões como:

- 📌 A diversificação simples já é suficiente para gerar carteiras competitivas?  
- 📌 Métodos de otimização realmente melhoram a eficiência risco-retorno?  
- 📌 Restrições de peso tornam o portfólio mais robusto e implementável?  
- 📌 O HRP entrega ganhos reais em diversificação estrutural?  
- 📌 Alternativos melhoram o fechamento da carteira de forma consistente?  

Além disso, o projeto busca entender:

- A diferença entre **retorno absoluto** e **qualidade do retorno**  
- O papel da **concentração** na aparente superioridade de algumas soluções  
- A importância de comparar métodos em uma base metodológica coerente  
- Se os resultados observados são **robustos ou sensíveis ao critério analisado**  

---

## 🧠 Metodologia

A análise foi construída em etapas estruturadas, priorizando consistência entre universos, métodos e métricas.

---

### 1. Construção da base global

- Coleta de dados históricos de **índices globais**, **ETFs** e **alternativos**
- Conversão integral dos ativos para **BRL**
- Padronização temporal das séries
- Separação entre:
  - bloco analítico de **índices**
  - bloco investível de **ETFs**
  - bloco opcional de **alternativos**
- Limpeza, alinhamento e validação das bases

---

### 2. Definição dos universos comparáveis

Foram montados diferentes recortes para preservar comparabilidade:

#### 🌍 Índices globais
- Usados como bloco de leitura macro e referência de mercado
- Não são misturados com ETFs na construção das carteiras

#### 📦 ETFs globais
- Usados como proxies investíveis para os mercados analisados
- Base principal para construção das carteiras

#### 🪙 Alternativos
- **Ouro**
- **Petróleo**
- **Bitcoin**

Esses ativos foram tratados como um bloco separado para avaliar seu impacto na diversificação e no fechamento das carteiras.

---

### 3. Construção das carteiras

Foram comparadas quatro abordagens principais:

#### 🟦 Equal Weight
- Pesos iguais entre os ativos do universo
- Serve como benchmark de diversificação simples
- Importante para avaliar se a sofisticação dos outros métodos realmente agrega valor

#### 📈 Markowitz puro
- Otimização clássica de portfólio
- Versões orientadas para:
  - **mínima volatilidade**
  - **máximo Sharpe**
- Sem restrições rígidas de concentração

#### 📉 Markowitz restrito
- Mesma lógica de otimização, porém com limites de peso
- Reduz concentração excessiva
- Gera carteiras mais disciplinadas e implementáveis

#### 🌲 HRP
- Alocação hierárquica baseada em estrutura de correlação
- Menor dependência da inversão direta da matriz de covariância
- Foco em robustez e diversificação estrutural

---

### 4. Dupla camada de diversificação

Um ponto central do projeto é que a diversificação ocorre em **duas camadas**:

- dentro de cada **ETF**, que já é uma cesta diversificada de ativos;
- entre os próprios **ETFs**, que combinam exposições de países, regiões, fatores e regimes de risco.

Isso significa que **adicionar mais ETFs não implica automaticamente uma carteira mais segura**. Em alguns casos, novos ETFs ampliam a diversificação de forma útil; em outros, apenas acrescentam exposições redundantes, mercados mais instáveis ou blocos de risco que elevam a volatilidade sem melhorar proporcionalmente o fechamento risco-retorno.

Essa leitura é importante porque ajuda a entender por que, em certas soluções otimizadas, a redução do número de ETFs não significou piora da carteira, mas sim eliminação de exposições redundantes ou pouco eficientes.

---

### 5. Simulação e séries das carteiras

Para cada carteira e família estratégica:

- 📈 Cálculo das séries de retorno
- 📊 Curvas base 100
- 📉 Drawdown ao longo do tempo
- 🔁 Comparação em cenários com e sem alternativos
- 🌍 Comparação entre universos globais sob uma mesma base monetária

---

### 6. Métricas de avaliação

Foram calculadas métricas de retorno, risco, eficiência e concentração:

- 📈 Retorno total
- 📈 CAGR
- 📊 Volatilidade anual
- ⚖️ Sharpe Ratio
- 📉 Drawdown máximo
- 📊 Sortino
- 📊 Calmar
- ✅ Percentual de meses positivos
- 📆 Melhor mês / pior mês
- 🧱 Peso máximo
- 🧱 Top 3 pesos
- 🧱 HHI
- 🧱 Número efetivo de ativos
- 🏆 Score agregado multicritério

---

### 7. Comparação consolidada entre famílias

O comparativo final foi organizado em **famílias de estratégia**, preservando a lógica interna de cada método:

- Equal Weight
- HRP
- Markowitz puro | min vol
- Markowitz puro | max sharpe
- Markowitz restrito | min vol
- Markowitz restrito | max sharpe

Essa separação foi importante para evitar misturar versões defensivas e ofensivas dos modelos de otimização e para manter uma leitura justa entre abordagens ofensivas, defensivas e mais equilibradas.

---

### 8. Testes estatísticos e robustez

Para validar os resultados observados:

- Testes pareados entre famílias
- Comparações entre cenários com e sem alternativos
- Avaliação de robustez entre métricas
- Verificação de consistência dos resultados agregados

O objetivo não foi apenas apontar “vencedores”, mas entender se as diferenças observadas encontravam sustentação empírica e se permaneciam consistentes quando avaliadas por mais de uma dimensão.

---

## 📈 Principais Resultados

- O **Equal Weight** se mostrou um benchmark forte e competitivo, provando que a diversificação simples já entrega uma base robusta  
- O **Markowitz puro**, especialmente nas versões orientadas a **max Sharpe**, apareceu como a abordagem mais capaz de empurrar eficiência e crescimento composto  
- O **Markowitz restrito** mostrou ganhos claros em disciplina de alocação, reduzindo concentração excessiva em relação ao modelo puro  
- O **HRP** apareceu como uma alternativa sólida em robustez e diversificação estrutural  
- Os **alternativos** tiveram impacto heterogêneo: ajudaram em alguns cenários, mas não melhoraram todas as famílias de forma uniforme  
- Métricas de concentração mostraram que parte da superioridade de algumas carteiras vinha acompanhada de maior dependência de poucos ativos  
- Em um universo de ETFs, a remoção de alguns fundos em certas soluções não significou perda automática de diversificação, mas frequentemente eliminação de exposições redundantes ou pouco eficientes  
- No fechamento final, houve **convergência relevante entre os critérios centrais**, com uma mesma família se destacando simultaneamente nos principais indicadores agregados  

👉 Isso sugere que:

> Diversificar já é poderoso —  
> otimizar pode melhorar bastante a eficiência —  
> e, nesta amostra, uma mesma família conseguiu combinar melhor retorno, qualidade do retorno e fechamento multicritério.

---

## 📊 Visualizações

O projeto inclui um relatório HTML interativo com:

- 📈 Curvas base 100 por universo, método e família  
- 📉 Gráficos de drawdown  
- 🌍 Comparações entre índices, ETFs e alternativos  
- 🎛️ Dropdowns e viewers por seção  
- 📊 Tabelas interativas com busca, ordenação e paginação  
- 🧱 Rankings de Sharpe, CAGR, drawdown e concentração  
- 📦 Comparação entre cenários com e sem alternativos  
- 🌲 Visualizações específicas para HRP  
- ⚖️ Comparação consolidada entre famílias  
- 🧪 Painéis de testes estatísticos e robustez  

---

## 🌐 Visualização do projeto

👉 https://mhirokitomida.github.io/analise_mercado_global/

---

## ⚠️ Observações importantes

- A análise não constitui recomendação de investimento  
- Os resultados dependem do período analisado e do universo de ativos selecionado  
- Modelos de otimização são sensíveis às estimativas de retorno e covariância  
- Alternativos não melhoram necessariamente todas as carteiras  
- Parte da eficiência observada pode vir acompanhada de maior concentração  
- Em um universo de ETFs, mais fundos não significam automaticamente mais segurança  
- O estudo busca identificar **evidência empírica**, não causalidade  
- Índices e ETFs foram tratados separadamente para evitar distorções metodológicas  
- Todos os resultados foram analisados em **BRL**, incluindo ativos originalmente cotados em outras moedas  

---

## 🧠 Principais Aprendizados

- A **diversificação simples** continua sendo uma estratégia muito forte  
- O **Equal Weight** funcionou como um benchmark honesto e competitivo  
- O **Markowitz puro** elevou eficiência e crescimento em vários cenários, mas frequentemente com mais concentração  
- O **Markowitz restrito** mostrou que restrições podem melhorar a qualidade prática da solução  
- O **HRP** reforçou seu valor como abordagem robusta e estruturalmente equilibrada  
- Os **alternativos** foram úteis em alguns contextos, mas não funcionaram como solução universal  
- Métricas de concentração foram essenciais para interpretar a qualidade real das carteiras  
- Em um universo de ETFs, **mais diversificação não equivale automaticamente a mais segurança**, porque novos fundos podem adicionar exposições redundantes ou estruturalmente mais voláteis  
- O fechamento final mostrou que, embora diferentes objetivos continuem relevantes, **uma mesma família conseguiu convergir liderança em critérios centrais**  
- Não basta perguntar “qual rendeu mais?”; é preciso perguntar **como esse retorno foi obtido**  
- A escolha da estratégia depende do objetivo do investidor e do equilíbrio desejado entre desempenho, risco, concentração e implementabilidade  

---

## 🏁 Conclusão

O estudo reforça uma ideia central:

> A análise de carteiras não deve ser feita por uma única métrica isolada, mas por um conjunto coerente de critérios.

Ao longo do projeto, ficou evidente que diferentes métodos resolvem problemas diferentes. O **Equal Weight** oferece simplicidade e força como benchmark. O **Markowitz puro** empurra a fronteira de eficiência, mas pode concentrar demais. O **Markowitz restrito** melhora a disciplina e a implementabilidade da alocação. O **HRP** oferece uma alternativa robusta e estruturalmente diversificada. Já os **alternativos** funcionam como instrumentos contextuais, e não como solução automática.

Ao mesmo tempo, o fechamento deste estudo mostrou algo importante: **não houve uma divisão completa entre vencedores por critério**. Pelo contrário, uma mesma família conseguiu se destacar simultaneamente nos principais indicadores do comparativo final, reunindo crescimento, eficiência e força no score agregado. Isso torna a conclusão mais forte, porque sugere que sua liderança não ficou restrita a uma dimensão isolada, mas apareceu de forma mais ampla no fechamento do projeto.

Outro aprendizado importante é que, em um universo composto por ETFs, a diversificação precisa ser interpretada com mais cuidado. Como cada ETF já é uma cesta diversificada internamente, a adição de mais fundos não implica automaticamente mais segurança. Em muitos casos, uma carteira melhor não é a que simplesmente acumula mais ETFs, mas a que seleciona melhor quais exposições globais fazem sentido em conjunto. Isso ajuda a explicar por que soluções mais enxutas puderam, em alguns casos, melhorar o fechamento risco-retorno sem que isso significasse empobrecimento da diversificação.

A principal contribuição do projeto foi mostrar que a análise de portfólios precisa ir além da pergunta “qual rendeu mais?”. Em um estudo desse porte, o que importa não é apenas o retorno final, mas também **como ele foi obtido**, com quanta volatilidade, com que profundidade de drawdown, com qual grau de concentração e com que consistência ao longo do tempo.

Em termos práticos:

> A diversificação simples continua poderosa —  
> a otimização pode melhorar bastante a eficiência —  
> as restrições tornam a carteira mais robusta —  
> e, nesta amostra, uma mesma família conseguiu combinar melhor retorno, qualidade do retorno e fechamento multicritério.
