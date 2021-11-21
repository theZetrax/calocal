import Link from 'next/link'
import { useRouter } from 'next/router'

import commonStyles from '../styles/common.module.css'
import styles from './records.module.css'
import { Card, Typography, Avatar, Badge, Button } from 'antd'
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  DollarCircleFilled,
  FireFilled,
  FireOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

const { Meta } = Card
const { Title } = Typography

const RecordInfoRow = ({ created_date, calories, price }) => (
  <div className={styles.infolist}>
    <Badge>
      <div className={styles.badgeinfolist}>
        <ClockCircleOutlined style={{ color: '#f5222d' }} />
        {created_date}
      </div>
    </Badge>
    <Badge>
      <div className={styles.badgeinfolist}>
        <FireFilled style={{ color: '#f5222d' }} />
        {calories}
      </div>
    </Badge>
    <Badge>
      <div className={styles.badgeinfolist}>
        <DollarCircleFilled style={{ color: '#f5222d' }} />
        {price}
      </div>
    </Badge>
  </div>
)

const RecordViewPage = () => {
  const router = useRouter()
  const { recordId } = router.query

  const [loading, setLoading] = useState(true)
  const [foodRecord, setFoodRecord] = useState({
    name: '',
    calories: 0,
    price: 0,
    created_date: new Date(),
  })

  useEffect(async () => {
    if (typeof recordId === 'undefined') return

    try {
      const response = await axios(`/records/${recordId}`)
      const { name, calories, price, created_at } = response.data.record

      setFoodRecord({
        name,
        calories,
        price,
        created_date: new Date(created_at).toDateString(),
      })

      setLoading(false)
    } catch (err) {
      console.error('Fetching Food Record Fialed')
    }
  }, [recordId])

  return (
    <div className={commonStyles.container}>
      <div>
        <Link href="/">
          <Button style={{ marginBottom: '8px' }} icon={<ArrowLeftOutlined />}>
            Go Back
          </Button>
        </Link>
        <Title level={3}>Your Food Record Entery</Title>
      </div>
      <Card loading={loading}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={foodRecord.name}
          description={
            <RecordInfoRow
              calories={foodRecord.calories}
              price={foodRecord.price}
              created_date={foodRecord.created_date}
            />
          }
        />
      </Card>
    </div>
  )
}

export default RecordViewPage
