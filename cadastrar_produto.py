#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script simples para cadastrar produtos na confeitaria
"""

import json
import os

def carregar_produtos():
    """Carrega produtos do arquivo JSON"""
    try:
        if os.path.exists('produtos.json'):
            with open('produtos.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            print("⚠️  Arquivo produtos.json não encontrado. Criando novo...")
            return []
    except Exception as e:
        print(f"❌ Erro ao carregar produtos: {e}")
        return []

def salvar_produtos(produtos):
    """Salva produtos no arquivo JSON"""
    try:
        with open('produtos.json', 'w', encoding='utf-8') as f:
            json.dump(produtos, f, ensure_ascii=False, indent=4)
        print("✅ Produtos salvos com sucesso!")
        return True
    except Exception as e:
        print(f"❌ Erro ao salvar produtos: {e}")
        return False

def obter_proximo_id(produtos):
    """Retorna o próximo ID disponível"""
    if not produtos:
        return 1
    return max(p['id'] for p in produtos) + 1

def listar_produtos(produtos):
    """Lista todos os produtos"""
    if not produtos:
        print("\n📦 Nenhum produto cadastrado.")
        return
    
    print("\n" + "="*80)
    print("📦 PRODUTOS CADASTRADOS")
    print("="*80)
    
    categorias_nome = {
        'doces-finos': 'Doces Finos',
        'caseiros': 'Caseiros',
        'gelados': 'Gelados',
        'festa': 'Bolos de Festa',
        'fitness': 'Fitness'
    }
    
    for produto in produtos:
        categoria = categorias_nome.get(produto['category'], produto['category'])
        print(f"\n🆔 ID: {produto['id']}")
        print(f"📝 Nome: {produto['name']}")
        print(f"🏷️  Categoria: {categoria}")
        print(f"💰 Preço: {produto['price']}")
        print(f"👥 Serve: {produto['serves']}")
        print(f"📄 Descrição: {produto['description']}")
        print("─"*80)

def cadastrar_produto():
    """Cadastra um novo produto"""
    print("\n" + "="*80)
    print("➕ CADASTRAR NOVO PRODUTO")
    print("="*80)
    
    produtos = carregar_produtos()
    
    # Nome
    nome = input("\n📝 Nome do produto: ").strip()
    if not nome:
        print("❌ Nome não pode ser vazio!")
        return
    
    # Categoria
    print("\n🏷️  Categorias disponíveis:")
    print("1. Doces Finos")
    print("2. Caseiros")
    print("3. Gelados")
    print("4. Bolos de Festa")
    print("5. Fitness")
    
    categorias_map = {
        '1': 'doces-finos',
        '2': 'caseiros',
        '3': 'gelados',
        '4': 'festa',
        '5': 'fitness'
    }
    
    cat_escolha = input("\nEscolha a categoria (1-5): ").strip()
    categoria = categorias_map.get(cat_escolha, 'caseiros')
    
    # Descrição
    descricao = input("\n📄 Descrição: ").strip()
    if not descricao:
        descricao = f"Delicioso {nome}"
    
    # Preço
    while True:
        try:
            preco_input = input("\n💰 Preço (ex: 79.90): ").strip().replace(',', '.')
            preco_valor = float(preco_input)
            preco_formatado = f"R$ {preco_valor:.2f}".replace('.', ',')
            break
        except ValueError:
            print("❌ Preço inválido! Use apenas números (ex: 79.90)")
    
    # Serve
    serve = input("\n👥 Serve quantas pessoas (ex: 6-8 pessoas): ").strip()
    if not serve.startswith("Serve"):
        serve = f"Serve {serve}"
    
    # Imagem
    imagem = input("\n🖼️  URL da imagem (pressione ENTER para usar imagem padrão): ").strip()
    if not imagem:
        imagem = "https://via.placeholder.com/600x400?text=Sem+Imagem"
    
    # Criar novo produto
    novo_produto = {
        "id": obter_proximo_id(produtos),
        "name": nome,
        "category": categoria,
        "image": imagem,
        "rating": 5,
        "ratingCount": 0,
        "description": descricao,
        "price": preco_formatado,
        "priceValue": preco_valor,
        "serves": serve
    }
    
    # Adicionar e salvar
    produtos.append(novo_produto)
    
    if salvar_produtos(produtos):
        print("\n" + "="*80)
        print("✅ PRODUTO CADASTRADO COM SUCESSO!")
        print("="*80)
        print(f"🆔 ID: {novo_produto['id']}")
        print(f"📝 Nome: {novo_produto['name']}")
        print(f"💰 Preço: {novo_produto['price']}")
        print("="*80)
        print("\n✨ O produto já está disponível no site!")
    else:
        print("\n❌ Erro ao cadastrar produto!")

def menu_principal():
    """Menu principal"""
    while True:
        print("\n" + "="*80)
        print("🍰 SISTEMA DE CADASTRO DE PRODUTOS - CONFEITARIA")
        print("="*80)
        
        produtos = carregar_produtos()
        print(f"\n📊 Total de produtos cadastrados: {len(produtos)}")
        
        print("\n" + "─"*80)
        print("OPÇÕES:")
        print("─"*80)
        print("1. Cadastrar novo produto")
        print("2. Listar produtos cadastrados")
        print("3. Atualizar lista")
        print("0. Sair")
        print("─"*80)
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '0':
            print("\n👋 Até logo!\n")
            break
        elif opcao == '1':
            cadastrar_produto()
            input("\nPressione ENTER para continuar...")
        elif opcao == '2':
            listar_produtos(produtos)
            input("\nPressione ENTER para continuar...")
        elif opcao == '3':
            print("\n🔄 Atualizando lista...")
            continue
        else:
            print("❌ Opção inválida!")

if __name__ == '__main__':
    try:
        menu_principal()
    except KeyboardInterrupt:
        print("\n\n👋 Programa encerrado pelo usuário.\n")
    except Exception as e:
        print(f"\n❌ Erro: {e}\n")
