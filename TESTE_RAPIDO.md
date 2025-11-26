# 🧪 Teste Rápido do Sistema

Siga estes passos para testar se tudo está funcionando:

## 1️⃣ Iniciar o servidor

```bash
cd confeitaria
python3 servidor.py
```

Você deve ver:
```
🍰 SERVIDOR DA CONFEITARIA INICIADO
📍 Acesse o site em: http://localhost:5000
```

**Deixe este terminal aberto!**

---

## 2️⃣ Testar visualização de pedidos

Abra um **novo terminal** e execute:

```bash
cd confeitaria
python3 ver_pedidos.py
```

Digite `2` para ver pedidos novos.

Você deve ver o pedido de exemplo que já existe no arquivo.

Digite `0` para sair.

---

## 3️⃣ Testar cadastro de produto

No mesmo terminal, execute:

```bash
python3 cadastrar_produto.py
```

Digite `1` para cadastrar um novo produto.

**Exemplo de cadastro:**
```
Nome do produto: Bolo de Chocolate Especial
Categoria: 1 (Doces Finos)
Descrição: Bolo de chocolate com cobertura especial
Preço: 85.90
Serve: 8-10 pessoas
URL da imagem: [pressione ENTER para usar padrão]
```

Você deve ver:
```
✅ PRODUTO CADASTRADO COM SUCESSO!
✨ O produto já está disponível no site!
```

Digite `0` para sair.

---

## 4️⃣ Verificar se o produto apareceu

### Opção A: Via script Python

```bash
python3 cadastrar_produto.py
```

Digite `2` para listar produtos. Você deve ver o novo produto na lista.

### Opção B: Via arquivo JSON

```bash
cat produtos.json | grep "Bolo de Chocolate Especial"
```

Você deve ver o produto no JSON.

---

## 5️⃣ Testar o site (opcional)

1. Abra o navegador em: **http://localhost:5000**
2. Acesse o cardápio
3. O novo produto deve aparecer na lista
4. Adicione produtos ao carrinho
5. Finalize um pedido
6. Volte ao terminal e execute `python3 ver_pedidos.py`
7. O novo pedido deve aparecer!

---

## ✅ Checklist de funcionamento

- [ ] Servidor inicia sem erros
- [ ] `ver_pedidos.py` mostra pedidos existentes
- [ ] `cadastrar_produto.py` cadastra novo produto
- [ ] Novo produto aparece ao listar produtos
- [ ] Novo produto está no `produtos.json`
- [ ] Site carrega produtos (se testou)
- [ ] Pedidos são salvos (se testou)

---

## 🎉 Se tudo funcionou, está pronto para usar!

Agora você pode:
- Cadastrar produtos reais da sua confeitaria
- Receber pedidos pelo site
- Visualizar pedidos no terminal

**Divirta-se! 🍰**
