import { connect } from 'react-redux'
import moment from 'moment'
import { getRecordsByRange, clearRecords } from '../redux/actions/user'

import styles from './FoodListByRecent.module.css'
import { Button, DatePicker, Typography } from 'antd'
import FoodDetailCard from './FoodDetailCard'
import { useEffect, useState } from 'react'
import LoadingComponent from './LoadingComponent'
import {
  ContainerTwoTone,
  SearchOutlined,
  SmileTwoTone,
} from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Title } = Typography

const defaultRanges = {
  'This Week': [moment().startOf('week'), moment()],
  'This Month': [moment().startOf('month'), moment()],
  Today: [moment(), moment()],
}

const FoodListByRange = (props) => {
  const { getRecordsByRange, recordList, loading } = props
  const [dateRange, setDateRange] = useState([null, null])

  const handleRangeSelect = (date) => {
    setDateRange(date)
  }

  const searchForRange = async () => {
    if (typeof dateRange[0] === undefined) return
    if (typeof dateRange[1] === undefined) return

    getRecordsByRange(dateRange[0].toDate(), dateRange[1].toDate())
  }

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <LoadingComponent />
      </div>
    )

  return (
    <div>
      <div>
        <RangePicker
          onChange={handleRangeSelect}
          ranges={defaultRanges}
          value={dateRange}
          style={{ marginBottom: '16px', marginRight: '8px' }}
        />
        <Button icon={<SearchOutlined />} onClick={searchForRange}>
          Search for Records
        </Button>
      </div>
      {recordList.length <= 0 ? (
        <Title level={5} className={styles.loadingContainer}>
          <ContainerTwoTone />
          You have nothing to see here or <SmileTwoTone /> Select Dates.
        </Title>
      ) : (
        recordList.map((record) => (
          <FoodDetailCard
            key={record.id}
            name={record.name}
            created_date={new Date(record.created_at)}
            id={record.id}
            price={record.price}
            calorie={record.calories}
          />
        ))
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  recordList: state.user.recordList,
  loading: state.user.loading,
})

const mapDispatchToProps = {
  getRecordsByRange,
  clearRecords,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListByRange)
