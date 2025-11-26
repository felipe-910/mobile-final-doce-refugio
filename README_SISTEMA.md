# 🍰 Sistema Completo de Confeitaria

Sistema simples e funcional para gerenciar pedidos e produtos de uma confeitaria online.

---

## 🎯 O que este sistema faz?

### ✅ Pedidos
- Cliente finaliza pedido no site
- Dados vão automaticamente para `pedidos.json`
- Python mostra os pedidos de forma organizada

### ✅ Produtos
- Funcionário cadastra produto via Python
- Produto salva em `produtos.json`
- Produto aparece automaticamente no site

---

## 📦 Arquivos do sistema

### 🐍 Scripts Python (Backend)

| Arquivo | Descrição |
|---------|-----------|
| `servidor.py` | Servidor Flask que gerencia API de pedidos e produtos |
| `ver_pedidos.py` | Script para visualizar pedidos recebidos |
| `cadastrar_produto.py` | Script para cadastrar novos produtos |

### 🌐 Scripts JavaScript (Frontend)

| Arquivo | Descrição |
|---------|-----------|
| `checkout_api.js` | Envia pedidos finalizados para o servidor |
| `cardapio_atualizado.js` | Carrega produtos do JSON automaticamente |

### 📄 Arquivos de dados

| Arquivo | Descrição |
|---------|-----------|
| `pedidos.json` | Armazena todos os pedidos |
| `produtos.json` | Armazena todos os produtos |

### 📖 Documentação

| Arquivo | Descrição |
|---------|-----------|
| `COMO_USAR.md` | Guia completo de uso |
| `TESTE_RAPIDO.md` | Passo a passo para testar |
| `README_SISTEMA.md` | Este arquivo |

---

## 🚀 Início rápido

### 1. Iniciar o servidor

```bash
python3 servidor.py
```

### 2. Ver pedidos

```bash
python3 ver_pedidos.py
```

### 3. Cadastrar produtos

```bash
python3 cadastrar_produto.py
```

---

## 🔧 Configuração do site

### Atualizar cardápio para carregar produtos automaticamente

No arquivo `cardapio.html`, substitua:

```html
<!-- Antes -->
<script src="cardapio.js"></script>

<!-- Depois -->
<script src="cardapio_atualizado.js"></script>
```

### Atualizar checkout para salvar pedidos automaticamente

No arquivo `checkout.html`, substitua:

```html
<!-- Antes -->
<script src="checkout.js"></script>

<!-- Depois -->
<script src="checkout_api.js"></script>
```

---

## 📊 Fluxo de dados

### Pedidos

```
Cliente no site
    ↓
Finaliza pedido
    ↓
checkout_api.js → POST /api/pedidos
    ↓
servidor.py salva em pedidos.json
    ↓
ver_pedidos.py lê e exibe
```

### Produtos

```
Funcionário
    ↓
cadastrar_produto.py
    ↓
Salva em produtos.json
    ↓
cardapio_atualizado.js → GET /api/produtos
    ↓
Produtos aparecem no site
```

---

## 🎨 Recursos

### Ver Pedidos (`ver_pedidos.py`)
- ✅ Lista todos os pedidos
- ✅ Filtra apenas pedidos novos
- ✅ Visualiza pedido específico
- ✅ Mostra endereço de entrega
- ✅ Mostra itens e valores

### Cadastrar Produtos (`cadastrar_produto.py`)
- ✅ Cadastro simples e rápido
- ✅ Categorias predefinidas
- ✅ Geração automática de ID
- ✅ Validação de dados
- ✅ Lista produtos cadastrados

### Servidor (`servidor.py`)
- ✅ API REST completa
- ✅ CORS habilitado
- ✅ Serve arquivos estáticos
- ✅ Logs de operações
- ✅ Tratamento de erros

---

## 🛠️ Requisitos

- Python 3.11+
- Flask (já instalado)
- Navegador web moderno

---

## 📝 API Endpoints

### Pedidos

```
GET  /api/pedidos          - Lista todos os pedidos
POST /api/pedidos          - Cria novo pedido
PUT  /api/pedidos/:number  - Atualiza status do pedido
```

### Produtos

```
GET    /api/produtos     - Lista todos os produtos
POST   /api/produtos     - Cria novo produto
PUT    /api/produtos/:id - Atualiza produto
DELETE /api/produtos/:id - Remove produto
```

---

## 💡 Dicas

1. **Sempre deixe o servidor rodando** durante o uso
2. **Produtos aparecem automaticamente** após cadastro (até 30s)
3. **Pedidos são salvos instantaneamente** ao finalizar
4. **Use Ctrl+C** para parar o servidor
5. **Arquivos JSON** podem ser editados manualmente se necessário

---

## 🐛 Solução de problemas

### Servidor não inicia?
```bash
# Verifique se a porta 5000 está livre
lsof -i :5000

# Ou use outra porta editando servidor.py
```

### Produtos não aparecem?
1. Verifique se o servidor está rodando
2. Recarregue a página (Ctrl+F5)
3. Verifique o console do navegador (F12)

### Pedidos não salvam?
1. Verifique se atualizou `checkout.html`
2. Verifique se o servidor está rodando
3. Veja os logs no terminal do servidor

---

## 📚 Documentação completa

- **Guia de uso:** `COMO_USAR.md`
- **Teste rápido:** `TESTE_RAPIDO.md`

---

## ✨ Pronto para usar!

Agora você tem um sistema completo e funcional para sua confeitaria! 🎉

**Boa sorte com as vendas! 🍰**
