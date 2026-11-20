const db = {
    get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val))
};

function render(view) {
    const content = document.getElementById('content');
    
    // UI Simples de navegação
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.toggle('text-indigo-700', btn.innerText.toLowerCase() === view);
        btn.classList.toggle('text-gray-500', btn.innerText.toLowerCase() !== view);
    });

    switch(view) {
        case 'pdv':
            content.innerHTML = `<h2 class="text-xl font-semibold mb-4">Nova Venda</h2>
                                 <div class="grid gap-4">
                                    <input type="text" placeholder="Buscar produto..." class="p-3 border rounded-lg w-full">
                                    <div class="bg-white p-4 rounded-lg shadow">Total: R$ 0,00</div>
                                 </div>`;
            break;
        case 'produtos':
            content.innerHTML = `<h2 class="text-xl font-semibold mb-4">Produtos</h2>
                                 <button class="bg-indigo-600 text-white p-2 rounded mb-4">+ Novo Produto</button>`;
            break;
        case 'dashboard':
            content.innerHTML = `<h2 class="text-xl font-semibold mb-4">Dashboard</h2>
                                 <div class="bg-white p-4 rounded-lg shadow"><canvas id="salesChart"></canvas></div>`;
            initChart();
            break;
    }
}

function initChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
            datasets: [{ label: 'Vendas (R$)', data: [12, 19, 3, 5, 2], borderColor: '#4f46e5', tension: 0.1 }]
        }
    });
}

document.getElementById('date').innerText = new Date().toLocaleDateString();
render('pdv');
