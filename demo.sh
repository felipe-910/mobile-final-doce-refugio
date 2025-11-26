#!/bin/bash
# Script de demonstração do sistema

echo "🎂 DEMONSTRAÇÃO DO SISTEMA DE PEDIDOS"
echo "======================================"
echo ""
echo "1. Listando produtos cadastrados..."
echo ""
sleep 2

echo "1
1
0
0" | python3 sistema_pedidos.py | head -80

echo ""
echo "======================================"
echo "2. Verificando pedidos novos..."
echo ""
sleep 2

echo "3
0" | python3 sistema_pedidos.py

echo ""
echo "======================================"
echo "✅ Demonstração concluída!"
echo ""
echo "Para usar o sistema completo, execute:"
echo "  python3 sistema_pedidos.py"
echo ""
