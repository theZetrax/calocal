import Link from 'next/link'
import { connect } from 'react-redux'

// UI
import styles from './FoodList.module.css'
import { Button, Tabs } from 'antd'
import {
  CalendarOutlined,
  ContainerOutlined,
  PlusCircleFilled,
} from '@ant-design/icons'
import FoodListByRecent from './FoodListByRecent'
import FoodListByRange from './FoodListByRange'

// Custom
import { getRecordsByRecent, clearRecords } from '../redux/actions/user'
import { useEffect } from 'react'

const FoodList = (props) => {
  const { getRecordsByRecent, clearRecords } = props

  useEffect(async () => {
    try {
      await getRecordsByRecent()
    } catch (err) {
      console.error('Fetching Records Failed', {
        err,
      })
    }
  }, [])

  const handleTabChange = async (activeKey) => {
    if (activeKey == 1) getRecordsByRecent()
    else if (activeKey == 2) clearRecords()
  }

  const tabTitles = {
    recent: (
      <span>
        <ContainerOutlined />
        Recent
      </span>
    ),
    dateRange: (
      <span>
        <CalendarOutlined />
        Date Range
      </span>
    ),
  }

  return (
    <div className={styles.foodListContainer}>
      <Tabs
        onChange={handleTabChange}
        defaultActiveKey="1"
        type="card"
        size="middle"
      >
        <Tabs.TabPane tab={tabTitles.recent} key="1">
          <FoodListByRecent />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabTitles.dateRange} key="2">
          <FoodListByRange />
        </Tabs.TabPane>
      </Tabs>

      <Link href="/records/create">
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          className={styles.foodRecordCreateBtn}
        >
          Create Record
        </Button>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getRecordsByRecent,
  clearRecords,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodList)
