import React from 'react'
import { Card } from 'antd'

const MyCardItem = ({
  labelColor,
  label,
  title,
  content
}) => <Card
  hoverable
  style={{ width: '200px' }}>
  {label ? <p className='card_item_label' style={{ color: labelColor }}>{label}</p> : null}
  <p className='card_item_title'>{title}</p>
  <p className='card_item_content'>{content}</p>
</Card>

const DashBoard = () => {
  return <div className='dash_board'>
    <MyCardItem
      labelColor='red'
      label={'6%'}
      title={43}
      content='New Tickets' />
  </div>
}

export default DashBoard
