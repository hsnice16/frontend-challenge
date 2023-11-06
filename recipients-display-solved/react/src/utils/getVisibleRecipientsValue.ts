export function getVisibleRecipientsValue(
  container: HTMLTableDataCellElement,
  value: string
) {
  const containerContentWidth =
    container.getBoundingClientRect().right -
    container.getBoundingClientRect().left -
    20

  const divEle = document.createElement('div')
  divEle.textContent = value
  divEle.style.visibility = 'hidden'
  divEle.style.position = 'absolute'
  document.getElementById('root')?.appendChild(divEle)

  const elementScrollWidth = divEle.clientWidth
  const approxEachCharTakingPixel = elementScrollWidth / value.length
  const approxTotalCharToShow =
    containerContentWidth / approxEachCharTakingPixel

  document.getElementById('root')?.removeChild(divEle)
  const _approxTotalCharToShow =
    approxTotalCharToShow < value.length
      ? approxTotalCharToShow - 5
      : approxTotalCharToShow
  return value.slice(0, _approxTotalCharToShow)
}
