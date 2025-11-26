#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para sincronizar pedidos do navegador para o arquivo JSON
Este script deve ser executado periodicamente ou manualmente
"""

import json
import os
from datetime import datetime

def sincronizar_pedidos():
    """
    Sincroniza pedidos do localStorage (exportado manualmente) para pedidos.json
    """
    print("="*80)
    print("🔄 SINCRONIZAÇÃO DE PEDIDOS")
    print("="*80)
    
    # Verificar se existe arquivo de pedidos temporário
    arquivo_temp = "pedidos_temp.json"
    arquivo_pedidos = "pedidos.json"
    
    if not os.path.exists(arquivo_temp):
        print("\n⚠️  Arquivo temporário não encontrado!")
        print("\nPara sincronizar pedidos do navegador:")
        print("1. Abra o console do navegador (F12)")
        print("2. Execute: console.save(localStorage.getItem('all_orders'), 'pedidos_temp.json')")
        print("3. Ou copie manualmente o conteúdo de localStorage.getItem('all_orders')")
        print("4. Cole em um arquivo chamado 'pedidos_temp.json'")
        print("5. Execute este script novamente")
        return
    
    try:
        # Carregar pedidos do arquivo temporário
        with open(arquivo_temp, 'r', encoding='utf-8') as f:
            novos_pedidos = json.load(f)
        
        # Carregar pedidos existentes
        pedidos_existentes = []
        if os.path.exists(arquivo_pedidos):
            with open(arquivo_pedidos, 'r', encoding='utf-8') as f:
                pedidos_existentes = json.load(f)
        
        # Mesclar pedidos (evitar duplicatas por orderNumber)
        numeros_existentes = {p.get('orderNumber') for p in pedidos_existentes}
        pedidos_novos_unicos = [p for p in novos_pedidos if p.get('orderNumber') not in numeros_existentes]
        
        if pedidos_novos_unicos:
            pedidos_existentes.extend(pedidos_novos_unicos)
            
            # Salvar pedidos atualizados
            with open(arquivo_pedidos, 'w', encoding='utf-8') as f:
                json.dump(pedidos_existentes, f, ensure_ascii=False, indent=4)
            
            print(f"\n✅ {len(pedidos_novos_unicos)} novo(s) pedido(s) sincronizado(s)!")
            
            # Mostrar resumo dos novos pedidos
            print("\n📋 Novos pedidos:")
            for pedido in pedidos_novos_unicos:
                print(f"  • Pedido #{pedido.get('orderNumber')} - R$ {pedido.get('total', 0):.2f}")
        else:
            print("\n✅ Nenhum pedido novo para sincronizar.")
        
        # Remover arquivo temporário
        os.remove(arquivo_temp)
        print("\n🗑️  Arquivo temporário removido.")
        
    except Exception as e:
        print(f"\n❌ Erro ao sincronizar pedidos: {e}")


def exportar_pedidos_para_navegador():
    """
    Exporta pedidos do JSON para formato que pode ser importado no navegador
    """
    print("\n" + "="*80)
    print("📤 EXPORTAR PEDIDOS PARA NAVEGADOR")
    print("="*80)
    
    arquivo_pedidos = "pedidos.json"
    
    if not os.path.exists(arquivo_pedidos):
        print("\n⚠️  Nenhum pedido encontrado!")
        return
    
    try:
        with open(arquivo_pedidos, 'r', encoding='utf-8') as f:
            pedidos = json.load(f)
        
        # Criar código JavaScript para importar
        js_code = f"localStorage.setItem('all_orders', '{json.dumps(pedidos)}');"
        
        with open('importar_pedidos.js', 'w', encoding='utf-8') as f:
            f.write(js_code)
        
        print(f"\n✅ Arquivo 'importar_pedidos.js' criado!")
        print("\nPara importar no navegador:")
        print("1. Abra o console do navegador (F12)")
        print("2. Copie e cole o conteúdo de 'importar_pedidos.js'")
        print("3. Pressione Enter")
        
    except Exception as e:
        print(f"\n❌ Erro ao exportar pedidos: {e}")


if __name__ == "__main__":
    print("\n🎂 SISTEMA DE SINCRONIZAÇÃO DE PEDIDOS")
    print("\n1. Sincronizar pedidos do navegador para JSON")
    print("2. Exportar pedidos do JSON para navegador")
    print("0. Sair")
    
    opcao = input("\nEscolha uma opção: ").strip()
    
    if opcao == '1':
        sincronizar_pedidos()
    elif opcao == '2':
        exportar_pedidos_para_navegador()
    else:
        print("\n👋 Até logo!")
