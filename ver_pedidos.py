#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script simples para visualizar pedidos da confeitaria
"""

import json
import os
from datetime import datetime

def carregar_pedidos():
    """Carrega pedidos do arquivo JSON"""
    try:
        if os.path.exists('pedidos.json'):
            with open('pedidos.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            print("❌ Arquivo pedidos.json não encontrado!")
            return []
    except Exception as e:
        print(f"❌ Erro ao carregar pedidos: {e}")
        return []

def formatar_data(data_iso):
    """Formata data ISO para formato brasileiro"""
    try:
        dt = datetime.fromisoformat(data_iso.replace('Z', '+00:00'))
        return dt.strftime('%d/%m/%Y às %H:%M')
    except:
        return data_iso

def exibir_pedido(pedido, numero):
    """Exibe detalhes de um pedido"""
    print(f"\n{'='*80}")
    print(f"📦 PEDIDO #{numero}")
    print(f"{'='*80}")
    print(f"🆔 Número: {pedido.get('orderNumber', 'N/A')}")
    print(f"📅 Data: {formatar_data(pedido.get('orderDate', ''))}")
    print(f"📊 Status: {pedido.get('status', 'novo').upper()}")
    print(f"🚚 Tipo: {pedido.get('deliveryType', 'N/A').upper()}")
    
    # Endereço (se delivery)
    if pedido.get('deliveryType') == 'delivery' and pedido.get('address'):
        endereco = pedido['address']
        print(f"\n📍 ENDEREÇO DE ENTREGA:")
        print(f"   {endereco.get('rua', '')}, {endereco.get('numero', '')}")
        if endereco.get('complemento'):
            print(f"   Complemento: {endereco.get('complemento')}")
        print(f"   {endereco.get('bairro', '')} - {endereco.get('cidade', '')}")
        print(f"   CEP: {endereco.get('cep', '')}")
        if endereco.get('referencia'):
            print(f"   📌 Referência: {endereco.get('referencia')}")
    
    # Pagamento
    print(f"\n💳 PAGAMENTO: {pedido.get('paymentMethod', 'N/A').upper()}")
    if pedido.get('changeFor'):
        print(f"   💵 Troco para: {pedido.get('changeFor')}")
    
    # Itens
    print(f"\n🛒 ITENS DO PEDIDO:")
    for item in pedido.get('items', []):
        print(f"   • {item['quantity']}x {item['name']} - {item['price']}")
        if item.get('observations'):
            print(f"     💬 Obs: {item['observations']}")
    
    # Valores
    print(f"\n💰 VALORES:")
    print(f"   Subtotal: R$ {pedido.get('subtotal', 0):.2f}")
    print(f"   Taxa de Entrega: R$ {pedido.get('deliveryFee', 0):.2f}")
    print(f"   {'─'*40}")
    print(f"   ✨ TOTAL: R$ {pedido.get('total', 0):.2f}")
    print(f"{'='*80}\n")

def menu_principal():
    """Menu principal do sistema"""
    while True:
        print("\n" + "="*80)
        print("🍰 SISTEMA DE VISUALIZAÇÃO DE PEDIDOS - CONFEITARIA")
        print("="*80)
        
        pedidos = carregar_pedidos()
        
        if not pedidos:
            print("\n📭 Nenhum pedido encontrado.")
            print("\n1. Atualizar")
            print("0. Sair")
        else:
            # Contar pedidos por status
            novos = sum(1 for p in pedidos if p.get('status') == 'novo')
            total = len(pedidos)
            
            print(f"\n📊 Total de pedidos: {total}")
            print(f"🔔 Pedidos novos: {novos}")
            
            print("\n" + "─"*80)
            print("OPÇÕES:")
            print("─"*80)
            print("1. Ver todos os pedidos")
            print("2. Ver apenas pedidos novos")
            print("3. Ver pedido específico")
            print("4. Atualizar lista")
            print("0. Sair")
        
        print("─"*80)
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == '0':
            print("\n👋 Até logo!\n")
            break
        elif opcao == '1':
            if pedidos:
                for i, pedido in enumerate(pedidos, 1):
                    exibir_pedido(pedido, i)
                input("\nPressione ENTER para continuar...")
        elif opcao == '2':
            pedidos_novos = [p for p in pedidos if p.get('status') == 'novo']
            if pedidos_novos:
                for i, pedido in enumerate(pedidos_novos, 1):
                    exibir_pedido(pedido, i)
                input("\nPressione ENTER para continuar...")
            else:
                print("\n✅ Nenhum pedido novo no momento!")
                input("\nPressione ENTER para continuar...")
        elif opcao == '3':
            try:
                numero = int(input("\nNúmero do pedido (1 a {}): ".format(len(pedidos))))
                if 1 <= numero <= len(pedidos):
                    exibir_pedido(pedidos[numero-1], numero)
                    input("\nPressione ENTER para continuar...")
                else:
                    print("❌ Número inválido!")
            except ValueError:
                print("❌ Digite um número válido!")
        elif opcao == '4':
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
