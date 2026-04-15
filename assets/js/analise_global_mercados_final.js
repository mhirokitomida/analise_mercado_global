
let META = window.HTML_FINAL_META || {};
let COMPARACAO = window.HTML_FINAL_COMPARACAO || [];
let RESUMOS = window.HTML_FINAL_RESUMOS || {};
let SERIES_ANCHOR = window.HTML_FINAL_SERIES_ANCHOR || [];
let TABELAS_CATALOGO = window.HTML_FINAL_TABELAS_CATALOGO || [];
let GRAFICOS_CATALOGO = window.HTML_FINAL_GRAFICOS_CATALOGO || [];

let DT_COMPARACAO = null;

function uniqueSorted(array, numeric=false) {
    const vals = [...new Set(array.filter(v => v !== null && v !== undefined && v !== ""))];
    if (numeric) {
        return vals.map(x => Number(x)).sort((a,b) => a - b);
    }
    return vals.sort((a,b) => String(a).localeCompare(String(b), 'pt-BR'));
}

function initTomSelect(selectId, options, placeholder) {
    const el = document.getElementById(selectId);
    if (!el) return null;

    el.innerHTML = "";

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = String(opt.value);
        option.textContent = String(opt.label);
        el.appendChild(option);
    });

    return new TomSelect(el, {
        plugins: ['remove_button'],
        maxItems: null,
        maxOptions: 100000,
        persist: false,
        create: false,
        hideSelected: true,
        closeAfterSelect: false,
        placeholder: placeholder,
        searchField: ['text', 'value']
    });
}

function getSelectedValues(selectId) {
    const control = document.getElementById(selectId);
    if (!control || !control.tomselect) return [];
    return control.tomselect.items || [];
}

function setSelectedValues(selectId, values) {
    const control = document.getElementById(selectId);
    if (!control || !control.tomselect) return;

    control.tomselect.clear(true);
    values.forEach(v => control.tomselect.addItem(String(v), true));
}

function asNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

function formatPct(value, casas=1) {
    const n = asNumber(value);
    if (n === null) return "N/A";
    return (n * 100).toFixed(casas) + "%";
}

function formatNum(value, casas=2) {
    const n = asNumber(value);
    if (n === null) return "N/A";
    return n.toFixed(casas);
}

function ajustarDataTables() {
    setTimeout(function() {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    }, 80);
}

function popularKPIs() {
    const painel = META.painel_executivo || {};

    const setText = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    };

    setText("kpi_ativos", painel.qtd_ativos_total == null ? "N/A" : painel.qtd_ativos_total);
    setText("kpi_estrategias", painel.qtd_estrategias_consolidadas == null ? "N/A" : painel.qtd_estrategias_consolidadas);
    setText("kpi_familias", painel.qtd_familias_estrategia == null ? "N/A" : painel.qtd_familias_estrategia);
    setText("kpi_best_sharpe", painel.melhor_familia_sharpe || "N/A");
    setText("kpi_best_cagr", painel.melhor_familia_cagr || "N/A");
    setText("kpi_best_score", painel.melhor_familia_score || "N/A");
}

function carregarViewerGraficos(viewerId) {
    const select = document.getElementById(`grafico_select_${viewerId}`);
    const img = document.getElementById(`grafico_img_${viewerId}`);
    const cap = document.getElementById(`grafico_caption_${viewerId}`);
    const openLink = document.getElementById(`grafico_open_${viewerId}`);

    if (!select || !img || !cap || !openLink) return;

    const itens = GRAFICOS_CATALOGO.filter(x => x.viewer === viewerId);

    select.innerHTML = "";
    if (!itens.length) {
        select.innerHTML = '<option value="">Nenhum gráfico encontrado</option>';
        img.style.display = "none";
        cap.innerHTML = "Nenhum gráfico encontrado para esta seção.";
        openLink.style.display = "none";
        return;
    }

    itens.forEach((item, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = item.titulo;
        select.appendChild(opt);
    });

    const atualizar = () => {
        const item = itens[Number(select.value || 0)];
        if (!item) return;

        img.src = item.caminho_relativo;
        img.alt = item.titulo;
        img.style.display = "block";
        cap.innerHTML = `<b>${item.titulo}</b>${item.subtitulo ? " — " + item.subtitulo : ""}`;
        openLink.href = item.caminho_relativo;
        openLink.style.display = "inline-flex";
    };

    select.onchange = atualizar;
    atualizar();
}

function estilizarIframeTabela(frame) {
    try {
        const doc = frame.contentDocument || frame.contentWindow.document;
        if (!doc) return;

        const styleId = "iframe-table-style";
        if (doc.getElementById(styleId)) return;

        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                background: #ffffff;
                color: #0f172a;
                font-family: Arial, Helvetica, sans-serif;
            }

            body {
                padding: 14px;
            }

            table {
                width: 100%;
                border-collapse: separate !important;
                border-spacing: 0 !important;
                table-layout: auto;
                font-size: 14px;
                line-height: 1.5;
            }

            table.dataframe {
                width: 100%;
                border: 1px solid #dbe3ee;
                border-radius: 14px;
                overflow: hidden;
                box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
            }

            thead th {
                position: sticky;
                top: 0;
                z-index: 2;
                background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
                color: #0f172a;
                font-weight: 700;
                font-size: 13px;
                padding: 12px 14px;
                border-bottom: 1px solid #cfd8e3;
                border-right: 1px solid #e2e8f0;
                text-align: left !important;
                white-space: nowrap;
                vertical-align: middle;
            }

            thead th:first-child {
                border-left: 1px solid #e2e8f0;
            }

            tbody td,
            tbody th {
                padding: 10px 14px;
                border-bottom: 1px solid #e7edf5;
                border-right: 1px solid #edf2f7;
                text-align: left;
                vertical-align: top;
                color: #1e293b;
                background: #ffffff;
            }

            tbody td:first-child,
            tbody th:first-child {
                border-left: 1px solid #edf2f7;
            }

            tbody tr:nth-child(even) td,
            tbody tr:nth-child(even) th {
                background: #fafcff;
            }

            tbody tr:hover td,
            tbody tr:hover th {
                background: #eef6ff;
            }

            th.blank {
                background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
            }

            td, th {
                word-break: break-word;
            }
        `;

        doc.head.appendChild(style);
    } catch (e) {
        console.warn("Não foi possível estilizar o iframe da tabela:", e);
    }
}

function carregarViewerTabelas(viewerId) {
    const select = document.getElementById(`tabela_select_${viewerId}`);
    const frame = document.getElementById(`tabela_frame_${viewerId}`);
    const openLink = document.getElementById(`tabela_open_${viewerId}`);

    if (!select || !frame || !openLink) return;

    const itens = TABELAS_CATALOGO.filter(x => x.viewer === viewerId);

    select.innerHTML = "";
    if (!itens.length) {
        select.innerHTML = '<option value="">Nenhuma tabela encontrada</option>';
        frame.src = "about:blank";
        openLink.style.display = "none";
        return;
    }

    itens.forEach((item, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = item.titulo;
        select.appendChild(opt);
    });

    const atualizar = () => {
        const item = itens[Number(select.value || 0)];
        if (!item) return;

        frame.src = item.caminho_html_rel;
        openLink.href = item.caminho_html_rel;
        openLink.style.display = "inline-flex";
    };

    select.onchange = atualizar;
    atualizar();
}

function filtrosBaseComparacao() {
    return {
        metodos: getSelectedValues("filtro_metodo"),
        cenarios: getSelectedValues("filtro_cenario"),
        familias: getSelectedValues("filtro_familia"),
    };
}

function aplicarFiltrosComparacao(base) {
    const filtros = filtrosBaseComparacao();
    let out = base.slice();

    if (filtros.metodos.length) {
        out = out.filter(r => filtros.metodos.includes(String(r.metodo)));
    }

    if (filtros.cenarios.length) {
        out = out.filter(r => filtros.cenarios.includes(String(r.cenario_alternativos)));
    }

    if (filtros.familias.length) {
        out = out.filter(r => filtros.familias.includes(String(r.carteira)));
    }

    return out;
}

function atualizarRanking() {
    const metrica = document.getElementById("filtro_metrica_ranking").value || "sharpe";
    const topn = Number(document.getElementById("filtro_topn").value || 15);

    let base = aplicarFiltrosComparacao(COMPARACAO)
        .filter(r => asNumber(r[metrica]) !== null);

    const menorMelhor = ["vol_anual", "score_final", "peso_max", "top3_peso", "hhi"].includes(metrica);

    base.sort((a,b) => {
        const va = asNumber(a[metrica]);
        const vb = asNumber(b[metrica]);

        if (menorMelhor) return va - vb;
        return vb - va;
    });

    const top = base.slice(0, topn);

    const y = top.map(r => r.id_estrategia_unica);
    const x = top.map(r => asNumber(r[metrica]));
    const custom = top.map(r => [r.metodo_legivel, r.carteira, r.tipo, r.familia_legivel]);

    Plotly.newPlot("plot_ranking", [{
        x: x,
        y: y,
        type: "bar",
        orientation: "h",
        customdata: custom,
        hovertemplate:
            "Estratégia: %{y}<br>" +
            "Método: %{customdata[0]}<br>" +
            "Carteira: %{customdata[1]}<br>" +
            "Tipo: %{customdata[2]}<br>" +
            "Família: %{customdata[3]}<br>" +
            "Valor: %{x:.6f}<extra></extra>"
    }], {
        template: "plotly_white",
        title: "Ranking interativo por métrica",
        xaxis: {title: metrica},
        yaxis: {title: "Estratégia", automargin: true},
        margin: {t: 60, r: 30, l: 220, b: 60},
        height: Math.max(480, 42 * top.length)
    }, {responsive: true, displaylogo: false});

    if (DT_COMPARACAO) {
        DT_COMPARACAO.clear().rows.add(top).draw();
        ajustarDataTables();
    }
}

function atualizarScatter() {
    const metricaX = document.getElementById("filtro_scatter_x").value || "vol_anual";
    const metricaY = document.getElementById("filtro_scatter_y").value || "cagr";

    let base = aplicarFiltrosComparacao(COMPARACAO)
        .filter(r => asNumber(r[metricaX]) !== null && asNumber(r[metricaY]) !== null);

    const grupos = {};
    base.forEach(row => {
        const metodo = String(row.metodo_legivel || row.metodo);
        if (!grupos[metodo]) grupos[metodo] = [];
        grupos[metodo].push(row);
    });

    const traces = Object.keys(grupos).map(metodo => ({
        x: grupos[metodo].map(r => asNumber(r[metricaX])),
        y: grupos[metodo].map(r => asNumber(r[metricaY])),
        text: grupos[metodo].map(r => r.id_estrategia_unica),
        customdata: grupos[metodo].map(r => [r.carteira, r.tipo, r.familia_legivel, r.cenario_alternativos]),
        mode: "markers",
        type: "scatter",
        name: metodo,
        marker: {size: 11, opacity: 0.82},
        hovertemplate:
            "Estratégia: %{text}<br>" +
            "Carteira: %{customdata[0]}<br>" +
            "Tipo: %{customdata[1]}<br>" +
            "Família: %{customdata[2]}<br>" +
            "Cenário: %{customdata[3]}<br>" +
            `${metricaX}: %{x:.6f}<br>` +
            `${metricaY}: %{y:.6f}<extra></extra>`
    }));

    Plotly.newPlot("plot_scatter", traces, {
        template: "plotly_white",
        title: "Mapa interativo de risco, retorno e eficiência",
        xaxis: {title: metricaX},
        yaxis: {title: metricaY},
        legend: {title: {text: "Método"}},
        margin: {t: 60, r: 30, l: 70, b: 60},
        height: 560
    }, {responsive: true, displaylogo: false});
}

function atualizarSeriesAnchor() {
    const ancora = document.getElementById("filtro_ancora").value || "etfs_com_tudo";
    const modo = document.getElementById("filtro_modo_anchor").value || "base100";
    const familias = getSelectedValues("filtro_familia_anchor");

    let base = SERIES_ANCHOR.filter(r => r.ancora === ancora && r.modo === modo);

    if (familias.length) {
        base = base.filter(r => familias.includes(String(r.familia_estrategia)));
    }

    const series = uniqueSorted(base.map(r => r.familia_estrategia), false);

    const traces = series.map(fam => {
        const sub = base
            .filter(r => r.familia_estrategia === fam)
            .sort((a,b) => String(a.data_ref).localeCompare(String(b.data_ref)));

        return {
            x: sub.map(r => r.data_ref),
            y: sub.map(r => asNumber(r.valor)),
            mode: "lines",
            name: sub.length ? (sub[0].familia_legivel || fam) : fam,
            hovertemplate: "Família: %{fullData.name}<br>Data: %{x}<br>Valor: %{y:.6f}<extra></extra>"
        };
    });

    Plotly.newPlot("plot_anchor", traces, {
        template: "plotly_white",
        title: `Famílias de estratégia | ${ancora} | ${modo}`,
        xaxis: {title: "Data"},
        yaxis: {title: modo},
        legend: {title: {text: "Família"}},
        margin: {t: 60, r: 30, l: 70, b: 60},
        height: 560
    }, {responsive: true, displaylogo: false});
}

function atualizarDeltaAlternativos() {
    const metrica = document.getElementById("filtro_delta_alt").value || "delta_sharpe_medio";
    const base = (RESUMOS.impacto_alternativos || []).filter(r => asNumber(r[metrica]) !== null);

    const ordemAsc = ["delta_max_drawdown_medio"].includes(metrica);
    base.sort((a,b) => {
        const va = asNumber(a[metrica]);
        const vb = asNumber(b[metrica]);
        return ordemAsc ? vb - va : vb - va;
    });

    Plotly.newPlot("plot_delta_alt", [{
        x: base.map(r => r.familia_legivel || r.familia_estrategia),
        y: base.map(r => asNumber(r[metrica])),
        type: "bar",
        hovertemplate: "Família: %{x}<br>Valor: %{y:.6f}<extra></extra>"
    }], {
        template: "plotly_white",
        title: "Impacto dos alternativos por família",
        xaxis: {title: "Família", tickangle: -25},
        yaxis: {title: metrica},
        margin: {t: 60, r: 30, l: 70, b: 120},
        height: 520
    }, {responsive: true, displaylogo: false});
}

function initTabelaComparacao() {
    DT_COMPARACAO = $('#tabela_comp_interativa').DataTable({
        autoWidth: false,
        data: [],
        columns: [
            { data: 'id_estrategia_unica', title: 'Estratégia' },
            { data: 'metodo_legivel', title: 'Método' },
            { data: 'carteira', title: 'Carteira' },
            { data: 'tipo', title: 'Tipo' },
            { data: 'cenario_alternativos', title: 'Cenário' },
            { data: 'familia_legivel', title: 'Família' },
            { data: 'retorno_total', title: 'Retorno Total', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'cagr', title: 'CAGR', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'vol_anual', title: 'Vol Anual', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'sharpe', title: 'Sharpe', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'sortino', title: 'Sortino', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'max_drawdown', title: 'Max Drawdown', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'calmar', title: 'Calmar', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'score_final', title: 'Score Final', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'peso_max', title: 'Peso Máx', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'top3_peso', title: 'Top3 Peso', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'hhi', title: 'HHI', render: d => d == null ? "" : Number(d).toFixed(6) },
            { data: 'n_efetivo_ativos', title: 'N Efetivo', render: d => d == null ? "" : Number(d).toFixed(6) }
        ],
        deferRender: true,
        processing: true,
        pageLength: 15,
        scrollX: true,
        scrollY: "470px",
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel'],
        order: [],
        initComplete: function() {
            ajustarDataTables();
        }
    });
}

function initFiltros() {
    initTomSelect(
        "filtro_metodo",
        uniqueSorted(COMPARACAO.map(x => x.metodo), false).map(v => ({value: v, label: v})),
        "Selecione métodos"
    );

    initTomSelect(
        "filtro_cenario",
        uniqueSorted(COMPARACAO.map(x => x.cenario_alternativos), false).map(v => ({value: v, label: v})),
        "Selecione cenários"
    );

    initTomSelect(
        "filtro_familia",
        uniqueSorted(COMPARACAO.map(x => x.carteira), false).map(v => ({value: v, label: v})),
        "Selecione famílias"
    );

    initTomSelect(
        "filtro_familia_anchor",
        uniqueSorted(SERIES_ANCHOR.map(x => x.familia_estrategia), false).map(v => ({value: v, label: v})),
        "Selecione famílias"
    );
}

function conectarEventos() {
    ["filtro_metodo", "filtro_cenario", "filtro_familia"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", function() {
            atualizarRanking();
            atualizarScatter();
        });
    });

    ["filtro_metrica_ranking", "filtro_topn"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", atualizarRanking);
    });

    ["filtro_scatter_x", "filtro_scatter_y"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", atualizarScatter);
    });

    ["filtro_ancora", "filtro_modo_anchor", "filtro_familia_anchor"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", atualizarSeriesAnchor);
    });

    const delta = document.getElementById("filtro_delta_alt");
    if (delta) delta.addEventListener("change", atualizarDeltaAlternativos);

    const btnPresetAll = document.getElementById("btn_preset_all");
    if (btnPresetAll) {
        btnPresetAll.addEventListener("click", function() {
            setSelectedValues("filtro_metodo", uniqueSorted(COMPARACAO.map(x => x.metodo), false));
            setSelectedValues("filtro_cenario", uniqueSorted(COMPARACAO.map(x => x.cenario_alternativos), false));
            setSelectedValues("filtro_familia", []);
            atualizarRanking();
            atualizarScatter();
        });
    }

    const btnPresetCore = document.getElementById("btn_preset_core");
    if (btnPresetCore) {
        btnPresetCore.addEventListener("click", function() {
            setSelectedValues("filtro_metodo", ["equal_weight", "markowitz_puro", "markowitz_restrito", "hrp"]);
            setSelectedValues("filtro_cenario", ["com_alternativos", "sem_alternativos"]);
            setSelectedValues("filtro_familia", []);
            document.getElementById("filtro_metrica_ranking").value = "sharpe";
            document.getElementById("filtro_scatter_x").value = "vol_anual";
            document.getElementById("filtro_scatter_y").value = "cagr";
            atualizarRanking();
            atualizarScatter();
        });
    }
}

function initZoomImagens() {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const modalClose = document.getElementById("modalClose");

    function conectar() {
        document.querySelectorAll(".zoomable-img").forEach(img => {
            img.onclick = function() {
                if (!img.src) return;
                modalImg.src = img.src;
                modalImg.alt = img.alt || "";
                modal.classList.add("show");
            };
        });
    }

    conectar();

    modalClose.addEventListener("click", () => {
        modal.classList.remove("show");
        modalImg.src = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modalImg.src = "";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("show");
            modalImg.src = "";
        }
    });

    return conectar;
}

document.addEventListener("DOMContentLoaded", function() {
    popularKPIs();
    initFiltros();
    initTabelaComparacao();

    setSelectedValues("filtro_metodo", ["equal_weight", "markowitz_puro", "markowitz_restrito", "hrp"]);
    setSelectedValues("filtro_cenario", ["com_alternativos", "sem_alternativos"]);
    setSelectedValues("filtro_familia", []);

    setSelectedValues("filtro_familia_anchor", [
        "equal_weight",
        "markowitz_puro__max_sharpe",
        "markowitz_restrito__max_sharpe",
        "hrp"
    ]);

    ["universo", "equal_weight", "markowitz_puro", "markowitz_restrito", "hrp", "comparacao", "testes", "manifestos"].forEach(v => {
        carregarViewerGraficos(v);
        carregarViewerTabelas(v);
    });

    const reconectarZoom = initZoomImagens();
    setTimeout(reconectarZoom, 200);

    conectarEventos();
    atualizarRanking();
    atualizarScatter();
    atualizarSeriesAnchor();
    atualizarDeltaAlternativos();
    ajustarDataTables();

    window.addEventListener("resize", ajustarDataTables);
});
