const db = {
    get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val))
};

const router = {
    current: 'pdv',
    navigate(view) {
        this.current = view;
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('text-indigo-600', btn.dataset.view === view);
            btn.classList.toggle('text-gray-400', btn.dataset.view !== view);
        });
        render(view);
        lucide.createIcons();
    }
};

function render(view) {
    const content = document.getElementById('app-content');
    content.innerHTML = '';
    
    switch(view) {
        case 'pdv': renderPDV(content); break;
        case 'produtos': renderProdutos(content); break;
        case 'dashboard': renderDashboard(content); break;
    }
}

function renderPDV(el) {
    el.innerHTML = `
        <div class="space-y-4">
            <div class="relative">
                <input type="text" placeholder="Código ou nome do produto..." class="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                <i data-lucide="search" class="absolute left-4 top-4 text-gray-400"></i>
            </div>
            <div id="cart" class="bg-white rounded-2xl shadow-sm border p-4 space-y-3">
                <h3 class="font-semibold text-gray-700">Carrinho</h3>
                <div class="text-center py-10 text-gray-400">Carrinho vazio</div>
            </div>
            <button class="w-full bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg">Finalizar Venda</button>
        </div>
    `;
}

function renderProdutos(el) {
    const produtos = db.get('produtos');
    el.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Estoque</h2>
            <button class="bg-indigo-600 text-white p-2 rounded-xl"><i data-lucide="plus"></i></button>
        </div>
        <div class="space-y-2">
            ${produtos.map(p => `
                <div class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                        <p class="font-medium">${p.nome}</p>
                        <p class="text-sm text-gray-500">R$ ${p.preco.toFixed(2)}</p>
                    </div>
                    <button class="text-red-500 p-2"><i data-lucide="trash-2"></i></button>
                </div>
            `).join('') || '<p class="text-center py-10 text-gray-400">Nenhum produto cadastrado</p>'}
        </div>
    `;
}

function renderDashboard(el) {
    el.innerHTML = `
        <div class="bg-white p-6 rounded-2xl shadow-sm border mb-4">
            <h3 class="text-sm text-gray-500 font-medium">ROI Mensal</h3>
            <p class="text-3xl font-bold text-indigo-700">12.5%</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border">
            <canvas id="salesChart"></canvas>
        </div>
    `;
    setTimeout(() => {
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                datasets: [{ 
                    label: 'Vendas', 
                    data: [150, 230, 180, 290, 400, 350], 
                    borderColor: '#4338ca',
                    backgroundColor: 'rgba(67, 56, 202, 0.1)',
                    fill: true,
                    tension: 0.4 
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }, 100);
}

// Inicialização
render('pdv');
lucide.createIcons();
