import { InfoCircleFilled } from '@ant-design/icons'
import { Tabs, Card, Typography, Button } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import FoodDetailCard from '../../components/FoodDetailCard'
import LoadingComponent from '../../components/LoadingComponent'

import { getAllRecords, getAllUsers } from '../../redux/actions/admin'

import commonStyles from '../styles/common.module.css'

const { Title } = Typography

const MainPage = (props) => {
  const router = useRouter()
  const {
    recordList,
    getAllUsers,
    summaryBeforeWeek,
    summaryWeek,
    userList,
    loading,
    getAllRecords,
  } = props
  const todayDate = moment().calendar('Y-M-d')

  const handleTabChange = () => {}
  const tabTitles = {
    records: <span>Records Lsit</span>,
    users: <span>Users List</span>,
  }

  // Load all food enteries
  useEffect(async () => {
    try {
      await getAllRecords()
      await getAllUsers()
    } catch (err) {
      console.error('Failed to load all food enteries', {
        err,
      })
    }
  }, [])

  return (
    <div className={commonStyles.container}>
      <Card loading={loading}>
        <Title level={4}>User Statistics</Title>
        <p>
          Today: <b>{todayDate}</b>
        </p>
        <p>Current Week Enteries: {summaryWeek}</p>
        <p>Past Week Enteries: {summaryBeforeWeek}</p>
      </Card>
      <br />
      {loading ? (
        <div>
          <LoadingComponent />
        </div>
      ) : (
        <Tabs
          onChange={handleTabChange}
          defaultActiveKey="1"
          type="card"
          size="middle"
          style={{ paddingBottom: '16px' }}
        >
          <Tabs.TabPane tab={tabTitles.records} key="1">
            {recordList.map((record) => (
              <FoodDetailCard
                name={record.name}
                calorie={record.calories}
                created_date={new Date(record.created_at)}
                id={record.id}
                price={record.price}
                key={record.id}
              />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab={tabTitles.users} key="2">
            {userList.map((user) => (
              <Card className={commonStyles.card} key={user.id}>
                <div className={commonStyles.cardBody}>
                  <div>
                    <Title level={3}>{user.fullname}</Title>
                    <div>
                      <p>Username: {user.username}</p>
                      <p>Email {user.email}</p>
                      <p>Calorie Limit {user.calorie_limit}</p>
                    </div>
                  </div>
                  <div>
                    <Link href={`${router.pathname}/users/${user.id}`}>
                      <Button
                        type="primary"
                        size="small"
                        icon={<InfoCircleFilled />}
                      >
                        View Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  recordList: state.admin.recordList,
  summaryBeforeWeek: state.admin.summaryBeforeWeek,
  summaryWeek: state.admin.summaryWeek,
  userList: state.admin.userList,
  loading: state.admin.loading,
})

const mapDispatchToProps = {
  getAllRecords,
  getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
