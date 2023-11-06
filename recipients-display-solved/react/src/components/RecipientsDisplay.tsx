import React, { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getVisibleRecipientsValue } from '../utils'

const RecipientsContainer = styled('div')`
  display: flex;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  & > span {
    color: #f0f0f0;
    background-color: #666666;
    border-radius: 3px;
    padding: 2px 5px;
    font-size: 16px;
    margin-left: auto;
  }
`

type RecipientDisplayProps = React.PropsWithChildren<{
  recipients: string[]
}>

export default forwardRef(function RecipientsDisplay(
  { recipients }: RecipientDisplayProps,
  ref: React.RefObject<HTMLTableDataCellElement>
) {
  const recipientsJoin = recipients.join(', ')
  const [data, setData] = useState<{ emails: string; count: number }>({
    emails: '',
    count: 0,
  })

  useEffect(() => {
    function handleWindowResize() {
      if (ref.current) {
        const visibleRecipients = getVisibleRecipientsValue(
          ref.current,
          recipientsJoin
        )

        const visibleRecipientsList = visibleRecipients.split(', ')
        const viewRecipients = []
        for (let index = 0; index < visibleRecipientsList.length; index++) {
          if (visibleRecipientsList[index] === recipients[index]) {
            viewRecipients.push(visibleRecipientsList[index])
          }
        }

        if (viewRecipients.length === 0) {
          setData({
            emails: recipients[0],
            count: recipients.length - 1,
          })
        } else {
          const count = recipients.length - viewRecipients.length

          setData({
            emails:
              count === 0
                ? viewRecipients.join(', ')
                : viewRecipients.join(', ') + ', ...',
            count,
          })
        }
      }
    }

    handleWindowResize()
    addEventListener('resize', handleWindowResize)
    return () => removeEventListener('resize', handleWindowResize)
  }, [ref.current])

  return (
    <RecipientsContainer>
      <div>{data.emails}</div>
      {data.count !== 0 ? <span>+{data.count}</span> : null}
    </RecipientsContainer>
  )
})
