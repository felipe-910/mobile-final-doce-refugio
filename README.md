# 🎂 Sistema de Gerenciamento de Pedidos - Bolos Artesanais

Sistema Python de console integrado com PWA para gerenciar pedidos e produtos de uma confeitaria.

## 📋 Funcionalidades

### Sistema Python (Console)
- ✅ Visualizar pedidos novos em tempo real
- ✅ Gerenciar todos os pedidos (listar, atualizar status)
- ✅ Cadastrar novos produtos
- ✅ Editar produtos existentes
- ✅ Remover produtos
- ✅ Sincronização com arquivo JSON

### PWA (Site)
- ✅ Cardápio dinâmico carregado do JSON
- ✅ Carrinho de compras
- ✅ Checkout completo
- ✅ Pedidos salvos automaticamente

## 🚀 Como Usar

### 1. Executar o Sistema Python

```bash
cd /home/ubuntu/sistema_pedidos
python3 sistema_pedidos.py
```

#### Menu Principal:
- **Opção 1**: Gerenciar Produtos (adicionar, editar, remover, listar)
- **Opção 2**: Gerenciar Pedidos (ver todos, atualizar status)
- **Opção 3**: Ver Pedidos Novos (acesso rápido)

### 2. Integração com o PWA

#### Atualizar arquivos JavaScript do PWA:

Para que o PWA carregue produtos do JSON e salve pedidos corretamente:

1. **Substituir cardapio.js**:
   ```bash
   cp cardapio_novo.js cardapio.js
   ```

2. **Substituir checkout.js**:
   ```bash
   cp checkout_novo.js checkout.js
   ```

3. **Servir o PWA** (exemplo com Python):
   ```bash
   python3 -m http.server 8000
   ```

4. Acessar: `http://localhost:8000`

### 3. Sincronização de Pedidos

#### Método Automático (Recomendado):

Os pedidos são salvos automaticamente no `localStorage` do navegador. Para transferi-los para o sistema Python:

1. Abra o console do navegador (F12)
2. Execute:
   ```javascript
   const pedidos = localStorage.getItem('all_orders');
   console.log(pedidos);
   ```
3. Copie o conteúdo
4. Crie um arquivo `pedidos_temp.json` com o conteúdo
5. Execute:
   ```bash
   python3 sincronizar_pedidos.py
   ```

#### Método Manual:

Você pode copiar manualmente os pedidos do `localStorage` para `pedidos.json`.

## 📁 Estrutura de Arquivos

```
sistema_pedidos/
├── sistema_pedidos.py          # Sistema principal Python
├── sincronizar_pedidos.py      # Script de sincronização
├── produtos.json               # Banco de dados de produtos
├── pedidos.json                # Banco de dados de pedidos
├── cardapio.js                 # JavaScript original do PWA
├── cardapio_novo.js            # JavaScript atualizado (carrega do JSON)
├── checkout.js                 # JavaScript original do checkout
├── checkout_novo.js            # JavaScript atualizado (salva no JSON)
└── [outros arquivos do PWA]    # HTML, CSS, etc.
```

## 🔄 Fluxo de Trabalho

### Para Cadastrar Produtos:

1. Execute `python3 sistema_pedidos.py`
2. Escolha "1. Gerenciar Produtos"
3. Escolha "2. Adicionar Produto"
4. Preencha as informações
5. O produto será adicionado ao `produtos.json`
6. O PWA carregará automaticamente o novo produto

### Para Receber Pedidos:

1. Cliente faz pedido no PWA
2. Pedido é salvo no `localStorage` do navegador
3. Execute o sistema Python: `python3 sistema_pedidos.py`
4. Escolha "3. Ver Pedidos Novos"
5. Os pedidos aparecem automaticamente (após sincronização)

### Para Atualizar Status de Pedidos:

1. No sistema Python, escolha "2. Gerenciar Pedidos"
2. Escolha "3. Atualizar Status de Pedido"
3. Digite o número do pedido
4. Escolha o novo status:
   - Novo
   - Em Preparo
   - Pronto
   - Saiu para Entrega
   - Entregue
   - Cancelado

## 🔧 Configuração Avançada

### Servidor Web para o PWA

Para servir o PWA em produção, você pode usar:

**Opção 1 - Python HTTP Server:**
```bash
python3 -m http.server 8000
```

**Opção 2 - Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Opção 3 - Nginx/Apache:**
Configure um virtual host apontando para o diretório do sistema.

### Sincronização Automática

Para sincronização automática de pedidos, você pode:

1. Criar uma API REST simples em Python (Flask/FastAPI)
2. Modificar o `checkout_novo.js` para enviar pedidos via POST
3. A API salva diretamente no `pedidos.json`

Exemplo básico com Flask:

```python
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/api/pedidos', methods=['POST'])
def criar_pedido():
    pedido = request.json
    
    # Carregar pedidos existentes
    with open('pedidos.json', 'r') as f:
        pedidos = json.load(f)
    
    # Adicionar novo pedido
    pedidos.append(pedido)
    
    # Salvar
    with open('pedidos.json', 'w') as f:
        json.dump(pedidos, f, indent=4)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(port=5000)
```

## 📊 Formato dos Dados

### Produto (produtos.json):
```json
{
    "id": 1,
    "name": "Red Velvet Premium",
    "category": "doces-finos",
    "image": "https://...",
    "rating": 5,
    "ratingCount": 128,
    "description": "Descrição do produto",
    "price": "R$ 94,90",
    "priceValue": 94.90,
    "serves": "Serve 8-10 pessoas"
}
```

### Pedido (pedidos.json):
```json
{
    "orderNumber": "123456789",
    "orderDate": "2025-01-15T10:30:00Z",
    "status": "novo",
    "deliveryType": "delivery",
    "paymentMethod": "pix",
    "items": [...],
    "address": {...},
    "subtotal": 150.00,
    "deliveryFee": 8.00,
    "total": 158.00
}
```

## 🐛 Solução de Problemas

### Produtos não aparecem no PWA:
- Verifique se `cardapio_novo.js` foi copiado para `cardapio.js`
- Verifique se `produtos.json` está no mesmo diretório
- Abra o console do navegador (F12) e veja se há erros

### Pedidos não aparecem no sistema Python:
- Execute a sincronização manual
- Verifique se `pedidos.json` existe e está válido
- Use "4. Recarregar Pedidos do Arquivo" no menu de pedidos

### Erro ao adicionar produto:
- Verifique se o preço está no formato correto (ex: 79.90)
- Certifique-se de que todos os campos obrigatórios foram preenchidos

## 📝 Notas Importantes

- Este é um sistema simples baseado em arquivos JSON
- Para produção, considere usar um banco de dados real (SQLite, PostgreSQL, etc.)
- Os pedidos do PWA ficam no `localStorage` até serem sincronizados
- Faça backup regular dos arquivos `produtos.json` e `pedidos.json`

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] API REST para sincronização automática
- [ ] Interface web para o sistema Python
- [ ] Notificações push para novos pedidos
- [ ] Relatórios e estatísticas
- [ ] Integração com gateway de pagamento
- [ ] Sistema de autenticação
- [ ] Backup automático em nuvem

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com o desenvolvedor.

---

**Desenvolvido com ❤️ para Bolos Artesanais**
