function indexToIcon (index) {
  switch (index) {
    case 0:
      return '&#x1F947;'
    case 1:
      return '&#x1F948;'
    case 2:
      return '&#x1F949;'
    default:
      return (index + 1).toString()
  }
}

export { indexToIcon }
