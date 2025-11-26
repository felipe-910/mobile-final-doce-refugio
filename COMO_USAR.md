# 🍰 Sistema Simples de Confeitaria

Sistema completo para gerenciar pedidos e produtos da confeitaria.

## 📋 O que o sistema faz?

✅ **Pedidos finalizados no site** → Salvam automaticamente no `pedidos.json`  
✅ **Python mostra os pedidos** → Script simples para visualizar todos os pedidos  
✅ **Produtos cadastrados** → Salvam no `produtos.json` e aparecem no site automaticamente  

---

## 🚀 Como usar

### 1️⃣ Iniciar o servidor

Abra um terminal e execute:

```bash
cd /caminho/para/confeitaria
python3 servidor.py
```

O servidor vai iniciar em: **http://localhost:5000**

**Deixe este terminal aberto enquanto usar o sistema!**

---

### 2️⃣ Ver pedidos recebidos

Abra outro terminal e execute:

```bash
cd /caminho/para/confeitaria
python3 ver_pedidos.py
```

**Menu disponível:**
- `1` - Ver todos os pedidos
- `2` - Ver apenas pedidos novos
- `3` - Ver pedido específico
- `0` - Sair

---

### 3️⃣ Cadastrar novos produtos

Abra um terminal e execute:

```bash
cd /caminho/para/confeitaria
python3 cadastrar_produto.py
```

**Menu disponível:**
- `1` - Cadastrar novo produto
- `2` - Listar produtos cadastrados
- `0` - Sair

**Ao cadastrar um produto, ele aparece automaticamente no site!**

---

## 📁 Arquivos importantes

### Arquivos que você criou/modificou:

1. **`servidor.py`** - Servidor que gerencia tudo (pedidos e produtos)
2. **`ver_pedidos.py`** - Script para visualizar pedidos
3. **`cadastrar_produto.py`** - Script para cadastrar produtos
4. **`checkout_api.js`** - JavaScript atualizado para salvar pedidos via API
5. **`cardapio_atualizado.js`** - JavaScript atualizado para carregar produtos do JSON

### Arquivos de dados (JSON):

- **`pedidos.json`** - Todos os pedidos ficam aqui
- **`produtos.json`** - Todos os produtos ficam aqui

---

## 🔄 Como funciona o fluxo completo

### Fluxo de PEDIDOS:

```
Cliente finaliza pedido no site
         ↓
checkout_api.js envia para servidor.py
         ↓
Servidor salva em pedidos.json
         ↓
ver_pedidos.py lê e mostra os pedidos
```

### Fluxo de PRODUTOS:

```
Funcionário cadastra produto via cadastrar_produto.py
         ↓
Script salva em produtos.json
         ↓
cardapio_atualizado.js carrega produtos automaticamente
         ↓
Produto aparece no site
```

---

## 🛠️ Configuração do site

### Para usar o novo sistema no site:

#### 1. Atualizar `cardapio.html`

Substitua a linha que carrega o `cardapio.js` por:

```html
<script src="cardapio_atualizado.js"></script>
```

#### 2. Atualizar `checkout.html`

Substitua a linha que carrega o `checkout.js` por:

```html
<script src="checkout_api.js"></script>
```

---

## 💡 Dicas importantes

1. **Sempre deixe o servidor rodando** (`python3 servidor.py`)
2. **Os produtos aparecem automaticamente** no site após cadastro
3. **Os pedidos são salvos automaticamente** quando o cliente finaliza
4. **Você pode ver os pedidos a qualquer momento** com `ver_pedidos.py`

---

## 🆘 Problemas comuns

### O site não carrega produtos?

- Verifique se o servidor está rodando
- Verifique se o arquivo `produtos.json` existe
- Abra o console do navegador (F12) para ver erros

### Pedidos não estão sendo salvos?

- Verifique se o servidor está rodando
- Verifique se você atualizou o `checkout.html` para usar `checkout_api.js`
- Veja no terminal do servidor se aparecem mensagens de pedidos recebidos

### Produtos não aparecem no site?

- Verifique se você atualizou o `cardapio.html` para usar `cardapio_atualizado.js`
- Recarregue a página (Ctrl+F5)
- Aguarde até 30 segundos (o site atualiza automaticamente)

---

## 📞 Resumo dos comandos

```bash
# Iniciar servidor (deixe rodando)
python3 servidor.py

# Ver pedidos
python3 ver_pedidos.py

# Cadastrar produtos
python3 cadastrar_produto.py
```

---

## ✨ Pronto!

Agora você tem um sistema completo e simples para gerenciar sua confeitaria! 🎉
