import { connect } from 'react-redux'

// UI
import { Tabs } from 'antd'
import { CalendarOutlined, ContainerOutlined } from '@ant-design/icons'
import FoodListByRecent from './FoodListByRecent'

// Custom
import { updateFoodList } from '../redux/actions/user'

const FoodList = (props) => {
  const { updateFoodList } = props

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
    <Tabs defaultActiveKey="1" type="card" size="middle">
      <Tabs.TabPane tab={tabTitles.recent} key="1">
        <FoodListByRecent />
      </Tabs.TabPane>
      <Tabs.TabPane tab={tabTitles.dateRange} key="2">
        Content of Tab2
      </Tabs.TabPane>
    </Tabs>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  updateFoodList,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodList)
