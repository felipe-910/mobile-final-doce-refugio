# 🎯 Guia Visual Simplificado

## Sistema em 3 passos

---

## 1️⃣ INICIAR O SERVIDOR

### Abra um terminal e digite:

```bash
cd confeitaria
python3 servidor.py
```

### ✅ Você verá:

```
🍰 SERVIDOR DA CONFEITARIA INICIADO
📍 Acesse o site em: http://localhost:5000
```

**⚠️ IMPORTANTE: Deixe este terminal aberto!**

---

## 2️⃣ VER PEDIDOS

### Abra OUTRO terminal e digite:

```bash
cd confeitaria
python3 ver_pedidos.py
```

### 📋 Menu:

```
1. Ver todos os pedidos
2. Ver apenas pedidos novos  ← RECOMENDADO
3. Ver pedido específico
0. Sair
```

### 📦 Exemplo de pedido:

```
================================================================================
📦 PEDIDO #1
================================================================================
🆔 Número: 123456789
📅 Data: 19/01/2025 às 14:30
📊 Status: NOVO
🚚 Tipo: DELIVERY

📍 ENDEREÇO DE ENTREGA:
   Rua das Flores, 123
   Complemento: Apto 45
   Centro - São Paulo
   CEP: 12345-678

💳 PAGAMENTO: PIX

🛒 ITENS DO PEDIDO:
   • 2x Red Velvet Premium - R$ 94,90
   • 1x Morango Fresco - R$ 87,90

💰 VALORES:
   Subtotal: R$ 277.70
   Taxa de Entrega: R$ 8.00
   ────────────────────────────────────────
   ✨ TOTAL: R$ 285.70
================================================================================
```

---

## 3️⃣ CADASTRAR PRODUTOS

### No terminal, digite:

```bash
cd confeitaria
python3 cadastrar_produto.py
```

### 📋 Menu:

```
1. Cadastrar novo produto  ← ESCOLHA ESTA
2. Listar produtos cadastrados
0. Sair
```

### ➕ Exemplo de cadastro:

```
📝 Nome do produto: Bolo de Chocolate Especial
🏷️  Categoria: 1 (Doces Finos)
📄 Descrição: Bolo de chocolate com cobertura especial
💰 Preço: 85.90
👥 Serve: 8-10 pessoas
🖼️  URL da imagem: [ENTER para usar padrão]
```

### ✅ Resultado:

```
================================================================================
✅ PRODUTO CADASTRADO COM SUCESSO!
================================================================================
🆔 ID: 17
📝 Nome: Bolo de Chocolate Especial
💰 Preço: R$ 85,90
================================================================================

✨ O produto já está disponível no site!
```

---

## 🔄 ATUALIZAR O SITE

### Para que tudo funcione, você precisa atualizar 2 arquivos HTML:

### 📝 Arquivo: `cardapio.html`

**Procure esta linha:**
```html
<script src="cardapio.js"></script>
```

**Troque por:**
```html
<script src="cardapio_atualizado.js"></script>
```

---

### 📝 Arquivo: `checkout.html`

**Procure esta linha:**
```html
<script src="checkout.js"></script>
```

**Troque por:**
```html
<script src="checkout_api.js"></script>
```

---

## ✨ PRONTO!

### Agora:

✅ Pedidos finalizados → Salvam em `pedidos.json`  
✅ Python mostra os pedidos → `ver_pedidos.py`  
✅ Produtos cadastrados → Salvam em `produtos.json`  
✅ Produtos aparecem no site → Automaticamente  

---

## 🎯 Comandos resumidos

```bash
# 1. Iniciar servidor (deixe rodando)
python3 servidor.py

# 2. Ver pedidos (em outro terminal)
python3 ver_pedidos.py

# 3. Cadastrar produtos (em outro terminal)
python3 cadastrar_produto.py
```

---

## 🆘 Problemas?

### Servidor não inicia?
- Verifique se está na pasta `confeitaria`
- Tente fechar e abrir o terminal novamente

### Produtos não aparecem no site?
- Verifique se atualizou o `cardapio.html`
- Recarregue a página com Ctrl+F5
- Aguarde até 30 segundos

### Pedidos não salvam?
- Verifique se atualizou o `checkout.html`
- Verifique se o servidor está rodando
- Olhe o terminal do servidor para ver se há erros

---

## 🎉 É isso!

**Sistema simples, mas completo e funcional!**

Qualquer dúvida, consulte:
- `COMO_USAR.md` - Guia detalhado
- `TESTE_RAPIDO.md` - Teste passo a passo
- `README_SISTEMA.md` - Documentação completa
