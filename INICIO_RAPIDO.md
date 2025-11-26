# 🚀 Guia de Início Rápido

## ⚡ Começar em 3 Passos

### 1️⃣ Executar o Sistema Python

```bash
cd sistema_pedidos
python3 sistema_pedidos.py
```

**Menu disponível:**
- `1` - Gerenciar Produtos (adicionar, editar, remover)
- `2` - Gerenciar Pedidos (ver todos, atualizar status)
- `3` - Ver Pedidos Novos (acesso rápido) ⭐
- `0` - Sair

### 2️⃣ Atualizar o PWA (Site)

Para que o site carregue produtos do JSON:

```bash
cd sistema_pedidos
cp cardapio_novo.js cardapio.js
cp checkout_novo.js checkout.js
```

### 3️⃣ Servir o PWA

```bash
cd sistema_pedidos
python3 -m http.server 8000
```

Acesse: **http://localhost:8000**

---

## 📝 Exemplo de Uso

### Adicionar um Produto Novo

1. Execute: `python3 sistema_pedidos.py`
2. Digite: `1` (Gerenciar Produtos)
3. Digite: `2` (Adicionar Produto)
4. Preencha:
   - Nome: `Bolo de Chocolate Especial`
   - Categoria: `1` (Doces Finos)
   - Descrição: `Delicioso bolo de chocolate com cobertura cremosa`
   - Preço: `85.90`
   - Serve: `8-10 pessoas`
   - URL da imagem: (pressione Enter para usar imagem padrão)

✅ Produto adicionado! Ele aparecerá automaticamente no site.

### Ver Pedidos Novos

1. Execute: `python3 sistema_pedidos.py`
2. Digite: `3` (Ver Pedidos Novos)
3. Todos os pedidos com status "novo" serão exibidos

### Atualizar Status de um Pedido

1. Execute: `python3 sistema_pedidos.py`
2. Digite: `2` (Gerenciar Pedidos)
3. Digite: `3` (Atualizar Status)
4. Digite o número do pedido (ex: `123456789`)
5. Escolha o novo status:
   - `1` - Novo
   - `2` - Em Preparo ⏳
   - `3` - Pronto ✅
   - `4` - Saiu para Entrega 🚚
   - `5` - Entregue 🎉
   - `6` - Cancelado ❌

---

## 🔄 Como Funciona a Integração

### PWA → Sistema Python

1. Cliente faz pedido no site
2. Pedido é salvo no `localStorage` do navegador
3. Pedido também é salvo em `pedidos.json` (automaticamente)
4. Sistema Python lê `pedidos.json`
5. Pedido aparece na lista de "Pedidos Novos"

### Sistema Python → PWA

1. Você adiciona/edita produto no sistema Python
2. Produto é salvo em `produtos.json`
3. Site carrega produtos de `produtos.json`
4. Novo produto aparece automaticamente no cardápio

---

## 📂 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `sistema_pedidos.py` | Sistema principal Python |
| `produtos.json` | Banco de dados de produtos |
| `pedidos.json` | Banco de dados de pedidos |
| `cardapio_novo.js` | JavaScript atualizado do cardápio |
| `checkout_novo.js` | JavaScript atualizado do checkout |

---

## 🎯 Demonstração Rápida

Execute o script de demonstração:

```bash
./demo.sh
```

Isso mostrará:
- Lista de produtos cadastrados
- Pedidos novos (exemplo incluído)

---

## ❓ Perguntas Frequentes

### Como adiciono um produto?
Menu Principal → `1` → `2` → Preencha os dados

### Como vejo os pedidos?
Menu Principal → `3` (rápido) ou `2` → `1` (todos)

### O site não carrega os produtos?
Verifique se você executou:
```bash
cp cardapio_novo.js cardapio.js
```

### Os pedidos não aparecem?
Certifique-se de que `pedidos.json` existe e está válido.
Execute: `cat pedidos.json` para verificar.

### Como faço backup?
Copie os arquivos:
```bash
cp produtos.json produtos_backup.json
cp pedidos.json pedidos_backup.json
```

---

## 📞 Precisa de Ajuda?

Consulte o **README.md** completo para informações detalhadas.

---

**Pronto para começar! 🎂**
