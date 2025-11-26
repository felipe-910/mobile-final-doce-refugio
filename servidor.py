#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor simples para gerenciar pedidos e produtos da confeitaria
"""

from flask import Flask, request, jsonify, send_from_directory
import json
import os
from datetime import datetime

app = Flask(__name__)

# Arquivos JSON
ARQUIVO_PEDIDOS = 'pedidos.json'
ARQUIVO_PRODUTOS = 'produtos.json'

# Adicionar headers CORS manualmente
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def carregar_json(arquivo):
    """Carrega dados de um arquivo JSON"""
    try:
        if os.path.exists(arquivo):
            with open(arquivo, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Erro ao carregar {arquivo}: {e}")
        return []

def salvar_json(arquivo, dados):
    """Salva dados em um arquivo JSON"""
    try:
        with open(arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados, f, ensure_ascii=False, indent=4)
        return True
    except Exception as e:
        print(f"Erro ao salvar {arquivo}: {e}")
        return False

# ============== ROTAS DE PEDIDOS ==============

@app.route('/api/pedidos', methods=['GET', 'OPTIONS'])
def listar_pedidos():
    """Lista todos os pedidos"""
    if request.method == 'OPTIONS':
        return '', 200
    pedidos = carregar_json(ARQUIVO_PEDIDOS)
    return jsonify(pedidos)

@app.route('/api/pedidos', methods=['POST'])
def criar_pedido():
    """Cria um novo pedido"""
    try:
        novo_pedido = request.json
        pedidos = carregar_json(ARQUIVO_PEDIDOS)
        pedidos.append(novo_pedido)
        
        if salvar_json(ARQUIVO_PEDIDOS, pedidos):
            print(f"\n✅ Novo pedido recebido: #{novo_pedido.get('orderNumber')}")
            print(f"   Total: R$ {novo_pedido.get('total', 0):.2f}")
            print(f"   Tipo: {novo_pedido.get('deliveryType', 'N/A')}")
            return jsonify({"success": True, "message": "Pedido salvo com sucesso!"}), 201
        else:
            return jsonify({"success": False, "message": "Erro ao salvar pedido"}), 500
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/pedidos/<order_number>', methods=['PUT'])
def atualizar_pedido(order_number):
    """Atualiza status de um pedido"""
    try:
        dados = request.json
        pedidos = carregar_json(ARQUIVO_PEDIDOS)
        
        for pedido in pedidos:
            if pedido.get('orderNumber') == order_number:
                pedido['status'] = dados.get('status', pedido.get('status'))
                if salvar_json(ARQUIVO_PEDIDOS, pedidos):
                    return jsonify({"success": True, "message": "Pedido atualizado!"})
        
        return jsonify({"success": False, "message": "Pedido não encontrado"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# ============== ROTAS DE PRODUTOS ==============

@app.route('/api/produtos', methods=['GET', 'OPTIONS'])
def listar_produtos():
    """Lista todos os produtos"""
    if request.method == 'OPTIONS':
        return '', 200
    produtos = carregar_json(ARQUIVO_PRODUTOS)
    return jsonify(produtos)

@app.route('/api/produtos', methods=['POST'])
def criar_produto():
    """Cria um novo produto"""
    try:
        novo_produto = request.json
        produtos = carregar_json(ARQUIVO_PRODUTOS)
        
        # Gerar novo ID
        if produtos:
            novo_id = max(p['id'] for p in produtos) + 1
        else:
            novo_id = 1
        
        novo_produto['id'] = novo_id
        novo_produto['rating'] = novo_produto.get('rating', 5)
        novo_produto['ratingCount'] = novo_produto.get('ratingCount', 0)
        
        produtos.append(novo_produto)
        
        if salvar_json(ARQUIVO_PRODUTOS, produtos):
            print(f"\n✅ Novo produto cadastrado: {novo_produto.get('name')} (ID: {novo_id})")
            print(f"   Preço: {novo_produto.get('price')}")
            print(f"   Categoria: {novo_produto.get('category')}")
            return jsonify({"success": True, "message": "Produto cadastrado!", "produto": novo_produto}), 201
        else:
            return jsonify({"success": False, "message": "Erro ao salvar produto"}), 500
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/produtos/<int:produto_id>', methods=['PUT'])
def atualizar_produto(produto_id):
    """Atualiza um produto"""
    try:
        dados = request.json
        produtos = carregar_json(ARQUIVO_PRODUTOS)
        
        for produto in produtos:
            if produto['id'] == produto_id:
                produto.update(dados)
                if salvar_json(ARQUIVO_PRODUTOS, produtos):
                    return jsonify({"success": True, "message": "Produto atualizado!"})
        
        return jsonify({"success": False, "message": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/produtos/<int:produto_id>', methods=['DELETE'])
def deletar_produto(produto_id):
    """Deleta um produto"""
    try:
        produtos = carregar_json(ARQUIVO_PRODUTOS)
        produtos_filtrados = [p for p in produtos if p['id'] != produto_id]
        
        if len(produtos_filtrados) < len(produtos):
            if salvar_json(ARQUIVO_PRODUTOS, produtos_filtrados):
                return jsonify({"success": True, "message": "Produto removido!"})
        
        return jsonify({"success": False, "message": "Produto não encontrado"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# ============== SERVIR ARQUIVOS ESTÁTICOS ==============

@app.route('/')
def index():
    if os.path.exists('index.html'):
        return send_from_directory('.', 'index.html')
    return send_from_directory('.', 'cardapio.html')

@app.route('/<path:path>')
def servir_arquivo(path):
    try:
        return send_from_directory('.', path)
    except:
        return "Arquivo não encontrado", 404

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🍰 SERVIDOR DA CONFEITARIA INICIADO")
    print("="*60)
    print("\n📍 Acesse o site em: http://localhost:5000")
    print("📊 API disponível em: http://localhost:5000/api/")
    print("\n⚙️  Endpoints disponíveis:")
    print("   GET  /api/pedidos - Listar pedidos")
    print("   POST /api/pedidos - Criar pedido")
    print("   GET  /api/produtos - Listar produtos")
    print("   POST /api/produtos - Criar produto")
    print("\n🛑 Pressione Ctrl+C para parar o servidor\n")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
