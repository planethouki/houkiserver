function mcMmoTypeToName (type) {
  switch (type.toLowerCase()) {
    case 'acrobatics':
      return '\u30A2\u30AF\u30ED\u30D0\u30C6\u30A3\u30C3\u30AF'
    case 'alchemy':
      return '\u932C\u91D1\u8853'
    case 'archery':
      return '\u5F13'
    case 'axes':
      return '\u65A7'
    case 'excavation':
      return '\u6398\u524a'
    case 'fishing':
      return '\u91E3\u308A'
    case 'herbalism':
      return '\u8FB2\u696D'
    case 'mining':
      return '\u63A1\u6398'
    case 'repair':
      return '\u4FEE\u7406'
    case 'salvage':
      return '\u30B5\u30EB\u30D9\u30FC\u30B8'
    case 'smelting':
      return '\u7CBE\u932C'
    case 'swords':
      return '\u5263'
    case 'taming':
      return '\u8ABF\u6559'
    case 'unarmed':
      return '\u7D20\u624B'
    case 'woodcutting':
      return '\u6728\u3053\u308a'
    case 'totallevel':
      return '合計レベル'
    default:
      return 'Unknown'
  }
}

export { mcMmoTypeToName }
