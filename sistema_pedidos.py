#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sistema de Gerenciamento de Pedidos e Produtos
Integrado com PWA de Bolos
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Optional

class SistemaPedidos:
    def __init__(self):
        self.arquivo_produtos = "produtos.json"
        self.arquivo_pedidos = "pedidos.json"
        self.produtos = self.carregar_produtos()
        self.pedidos = self.carregar_pedidos()
        
    def carregar_produtos(self) -> List[Dict]:
        """Carrega produtos do arquivo JSON"""
        try:
            if os.path.exists(self.arquivo_produtos):
                with open(self.arquivo_produtos, 'r', encoding='utf-8') as f:
                    return json.load(f)
            return []
        except Exception as e:
            print(f"❌ Erro ao carregar produtos: {e}")
            return []
    
    def salvar_produtos(self):
        """Salva produtos no arquivo JSON"""
        try:
            with open(self.arquivo_produtos, 'w', encoding='utf-8') as f:
                json.dump(self.produtos, f, ensure_ascii=False, indent=4)
            print("✅ Produtos salvos com sucesso!")
        except Exception as e:
            print(f"❌ Erro ao salvar produtos: {e}")
    
    def carregar_pedidos(self) -> List[Dict]:
        """Carrega pedidos do arquivo JSON"""
        try:
            if os.path.exists(self.arquivo_pedidos):
                with open(self.arquivo_pedidos, 'r', encoding='utf-8') as f:
                    return json.load(f)
            return []
        except Exception as e:
            print(f"❌ Erro ao carregar pedidos: {e}")
            return []
    
    def salvar_pedidos(self):
        """Salva pedidos no arquivo JSON"""
        try:
            with open(self.arquivo_pedidos, 'w', encoding='utf-8') as f:
                json.dump(self.pedidos, f, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"❌ Erro ao salvar pedidos: {e}")
    
    def obter_proximo_id_produto(self) -> int:
        """Retorna o próximo ID disponível para produto"""
        if not self.produtos:
            return 1
        return max(p['id'] for p in self.produtos) + 1
    
    def listar_produtos(self):
        """Lista todos os produtos cadastrados"""
        if not self.produtos:
            print("\n📦 Nenhum produto cadastrado.")
            return
        
        print("\n" + "="*80)
        print("📦 PRODUTOS CADASTRADOS")
        print("="*80)
        
        categorias = {
            'doces-finos': 'Doces Finos',
            'caseiros': 'Caseiros',
            'gelados': 'Gelados',
            'festa': 'Bolos de Festa',
            'fitness': 'Fitness'
        }
        
        for produto in self.produtos:
            categoria = categorias.get(produto['category'], produto['category'])
            print(f"\nID: {produto['id']}")
            print(f"Nome: {produto['name']}")
            print(f"Categoria: {categoria}")
            print(f"Preço: {produto['price']} (R$ {produto['priceValue']:.2f})")
            print(f"Avaliação: {'⭐' * produto['rating']} ({produto['ratingCount']} avaliações)")
            print(f"Serve: {produto['serves']}")
            print(f"Descrição: {produto['description']}")
            print("-" * 80)
    
    def adicionar_produto(self):
        """Adiciona um novo produto"""
        print("\n" + "="*80)
        print("➕ ADICIONAR NOVO PRODUTO")
        print("="*80)
        
        try:
            nome = input("\nNome do produto: ").strip()
            if not nome:
                print("❌ Nome não pode ser vazio!")
                return
            
            print("\nCategorias disponíveis:")
            print("1. Doces Finos (doces-finos)")
            print("2. Caseiros (caseiros)")
            print("3. Gelados (gelados)")
            print("4. Bolos de Festa (festa)")
            print("5. Fitness (fitness)")
            
            categorias_map = {
                '1': 'doces-finos',
                '2': 'caseiros',
                '3': 'gelados',
                '4': 'festa',
                '5': 'fitness'
            }
            
            cat_escolha = input("Escolha a categoria (1-5): ").strip()
            categoria = categorias_map.get(cat_escolha, 'caseiros')
            
            descricao = input("Descrição: ").strip()
            
            preco_valor = float(input("Preço (ex: 79.90): ").strip().replace(',', '.'))
            preco_formatado = f"R$ {preco_valor:.2f}".replace('.', ',')
            
            serve = input("Serve quantas pessoas (ex: Serve 6-8 pessoas): ").strip()
            if not serve.startswith("Serve"):
                serve = f"Serve {serve}"
            
            imagem = input("URL da imagem (opcional, pressione Enter para pular): ").strip()
            if not imagem:
                imagem = "https://via.placeholder.com/600x400?text=Sem+Imagem"
            
            novo_produto = {
                "id": self.obter_proximo_id_produto(),
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
            
            self.produtos.append(novo_produto)
            self.salvar_produtos()
            
            print(f"\n✅ Produto '{nome}' adicionado com sucesso! (ID: {novo_produto['id']})")
            
        except ValueError:
            print("❌ Preço inválido! Use apenas números.")
        except Exception as e:
            print(f"❌ Erro ao adicionar produto: {e}")
    
    def editar_produto(self):
        """Edita um produto existente"""
        self.listar_produtos()
        
        try:
            produto_id = int(input("\nDigite o ID do produto para editar: "))
            produto = next((p for p in self.produtos if p['id'] == produto_id), None)
            
            if not produto:
                print(f"❌ Produto com ID {produto_id} não encontrado!")
                return
            
            print(f"\nEditando: {produto['name']}")
            print("(Pressione Enter para manter o valor atual)")
            
            nome = input(f"Nome [{produto['name']}]: ").strip()
            if nome:
                produto['name'] = nome
            
            descricao = input(f"Descrição [{produto['description']}]: ").strip()
            if descricao:
                produto['description'] = descricao
            
            preco = input(f"Preço [{produto['priceValue']:.2f}]: ").strip()
            if preco:
                preco_valor = float(preco.replace(',', '.'))
                produto['priceValue'] = preco_valor
                produto['price'] = f"R$ {preco_valor:.2f}".replace('.', ',')
            
            self.salvar_produtos()
            print("✅ Produto atualizado com sucesso!")
            
        except ValueError:
            print("❌ ID ou preço inválido!")
        except Exception as e:
            print(f"❌ Erro ao editar produto: {e}")
    
    def remover_produto(self):
        """Remove um produto"""
        self.listar_produtos()
        
        try:
            produto_id = int(input("\nDigite o ID do produto para remover: "))
            produto = next((p for p in self.produtos if p['id'] == produto_id), None)
            
            if not produto:
                print(f"❌ Produto com ID {produto_id} não encontrado!")
                return
            
            confirmacao = input(f"Tem certeza que deseja remover '{produto['name']}'? (s/n): ").lower()
            if confirmacao == 's':
                self.produtos = [p for p in self.produtos if p['id'] != produto_id]
                self.salvar_produtos()
                print("✅ Produto removido com sucesso!")
            else:
                print("❌ Remoção cancelada.")
                
        except ValueError:
            print("❌ ID inválido!")
        except Exception as e:
            print(f"❌ Erro ao remover produto: {e}")
    
    def listar_pedidos(self, apenas_novos=False):
        """Lista todos os pedidos ou apenas os novos"""
        pedidos_filtrados = self.pedidos
        
        if apenas_novos:
            pedidos_filtrados = [p for p in self.pedidos if p.get('status', 'novo') == 'novo']
        
        if not pedidos_filtrados:
            if apenas_novos:
                print("\n📭 Nenhum pedido novo no momento.")
            else:
                print("\n📭 Nenhum pedido registrado.")
            return
        
        print("\n" + "="*80)
        if apenas_novos:
            print("🔔 PEDIDOS NOVOS")
        else:
            print("📋 TODOS OS PEDIDOS")
        print("="*80)
        
        for pedido in pedidos_filtrados:
            self.exibir_detalhes_pedido(pedido)
    
    def exibir_detalhes_pedido(self, pedido):
        """Exibe detalhes de um pedido"""
        print(f"\n{'='*80}")
        print(f"🆔 Pedido: #{pedido.get('orderNumber', 'N/A')}")
        print(f"📅 Data: {self.formatar_data(pedido.get('orderDate', ''))}")
        print(f"📊 Status: {pedido.get('status', 'novo').upper()}")
        print(f"🚚 Tipo: {pedido.get('deliveryType', 'N/A').upper()}")
        
        if pedido.get('deliveryType') == 'delivery' and pedido.get('address'):
            endereco = pedido['address']
            print(f"\n📍 Endereço de Entrega:")
            print(f"   {endereco.get('rua', '')}, {endereco.get('numero', '')}")
            if endereco.get('complemento'):
                print(f"   Complemento: {endereco.get('complemento')}")
            print(f"   {endereco.get('bairro', '')} - {endereco.get('cidade', '')}")
            print(f"   CEP: {endereco.get('cep', '')}")
            if endereco.get('referencia'):
                print(f"   Referência: {endereco.get('referencia')}")
        
        print(f"\n💳 Pagamento: {pedido.get('paymentMethod', 'N/A').upper()}")
        if pedido.get('changeFor'):
            print(f"   Troco para: {pedido.get('changeFor')}")
        
        print(f"\n🛒 Itens do Pedido:")
        for item in pedido.get('items', []):
            print(f"   • {item['quantity']}x {item['name']} - {item['price']}")
            if item.get('observations'):
                print(f"     Obs: {item['observations']}")
        
        print(f"\n💰 Valores:")
        print(f"   Subtotal: R$ {pedido.get('subtotal', 0):.2f}")
        print(f"   Taxa de Entrega: R$ {pedido.get('deliveryFee', 0):.2f}")
        print(f"   TOTAL: R$ {pedido.get('total', 0):.2f}")
        print(f"{'='*80}")
    
    def formatar_data(self, data_iso):
        """Formata data ISO para formato brasileiro"""
        try:
            dt = datetime.fromisoformat(data_iso.replace('Z', '+00:00'))
            return dt.strftime('%d/%m/%Y às %H:%M:%S')
        except:
            return data_iso
    
    def atualizar_status_pedido(self):
        """Atualiza o status de um pedido"""
        self.listar_pedidos()
        
        try:
            numero_pedido = input("\nDigite o número do pedido (sem #): ").strip()
            pedido = next((p for p in self.pedidos if p.get('orderNumber') == numero_pedido), None)
            
            if not pedido:
                print(f"❌ Pedido #{numero_pedido} não encontrado!")
                return
            
            print("\nStatus disponíveis:")
            print("1. Novo")
            print("2. Em Preparo")
            print("3. Pronto")
            print("4. Saiu para Entrega")
            print("5. Entregue")
            print("6. Cancelado")
            
            status_map = {
                '1': 'novo',
                '2': 'em_preparo',
                '3': 'pronto',
                '4': 'saiu_entrega',
                '5': 'entregue',
                '6': 'cancelado'
            }
            
            escolha = input("Escolha o novo status (1-6): ").strip()
            novo_status = status_map.get(escolha)
            
            if novo_status:
                pedido['status'] = novo_status
                self.salvar_pedidos()
                print(f"✅ Status do pedido #{numero_pedido} atualizado para: {novo_status.upper()}")
            else:
                print("❌ Opção inválida!")
                
        except Exception as e:
            print(f"❌ Erro ao atualizar status: {e}")
    
    def verificar_novos_pedidos(self):
        """Verifica e exibe apenas pedidos novos"""
        self.pedidos = self.carregar_pedidos()
        self.listar_pedidos(apenas_novos=True)
    
    def menu_produtos(self):
        """Menu de gerenciamento de produtos"""
        while True:
            print("\n" + "="*80)
            print("📦 GERENCIAMENTO DE PRODUTOS")
            print("="*80)
            print("1. Listar Produtos")
            print("2. Adicionar Produto")
            print("3. Editar Produto")
            print("4. Remover Produto")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ").strip()
            
            if opcao == '1':
                self.listar_produtos()
            elif opcao == '2':
                self.adicionar_produto()
            elif opcao == '3':
                self.editar_produto()
            elif opcao == '4':
                self.remover_produto()
            elif opcao == '0':
                break
            else:
                print("❌ Opção inválida!")
    
    def menu_pedidos(self):
        """Menu de gerenciamento de pedidos"""
        while True:
            print("\n" + "="*80)
            print("📋 GERENCIAMENTO DE PEDIDOS")
            print("="*80)
            print("1. Ver Pedidos Novos")
            print("2. Ver Todos os Pedidos")
            print("3. Atualizar Status de Pedido")
            print("4. Recarregar Pedidos do Arquivo")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ").strip()
            
            if opcao == '1':
                self.verificar_novos_pedidos()
            elif opcao == '2':
                self.listar_pedidos()
            elif opcao == '3':
                self.atualizar_status_pedido()
            elif opcao == '4':
                self.pedidos = self.carregar_pedidos()
                print("✅ Pedidos recarregados!")
            elif opcao == '0':
                break
            else:
                print("❌ Opção inválida!")
    
    def menu_principal(self):
        """Menu principal do sistema"""
        print("\n" + "="*80)
        print("🎂 SISTEMA DE GERENCIAMENTO - BOLOS ARTESANAIS")
        print("="*80)
        
        while True:
            print("\n" + "="*80)
            print("MENU PRINCIPAL")
            print("="*80)
            print("1. Gerenciar Produtos")
            print("2. Gerenciar Pedidos")
            print("3. Ver Pedidos Novos (Rápido)")
            print("0. Sair")
            
            opcao = input("\nEscolha uma opção: ").strip()
            
            if opcao == '1':
                self.menu_produtos()
            elif opcao == '2':
                self.menu_pedidos()
            elif opcao == '3':
                self.verificar_novos_pedidos()
            elif opcao == '0':
                print("\n👋 Até logo!")
                break
            else:
                print("❌ Opção inválida!")


def main():
    """Função principal"""
    sistema = SistemaPedidos()
    sistema.menu_principal()


if __name__ == "__main__":
    main()
