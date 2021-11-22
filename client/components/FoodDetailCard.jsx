import styles from './FoodDetailCard.module.css'

import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, Button, Typography, Badge } from 'antd'
import {
  InfoCircleFilled,
  ClockCircleOutlined,
  FireFilled,
  DollarCircleFilled,
} from '@ant-design/icons'

const { Title } = Typography

const FoodDetailCard = (props) => {
  const router = useRouter()
  const { id, name, calorie, price } = props
  const created_date = props.created_date.toLocaleDateString()

  return (
    <Card className={styles.card}>
      <div className={styles.cardBody}>
        <div>
          <Title level={3}>{name}</Title>
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
                {calorie}
              </div>
            </Badge>
            <Badge>
              <div className={styles.badgeinfolist}>
                <DollarCircleFilled style={{ color: '#f5222d' }} />
                {price}
              </div>
            </Badge>
          </div>
        </div>
        <div>
          <Link
            href={{
              pathname: `${router.pathname}/records/[recordId]`,
              query: { ...router.query, recordId: id },
            }}
          >
            <Button type="primary" size="small" icon={<InfoCircleFilled />}>
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

FoodDetailCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  created_date: PropTypes.instanceOf(Date).isRequired,
  calorie: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
}

export default FoodDetailCard
