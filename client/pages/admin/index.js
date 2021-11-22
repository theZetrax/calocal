import { InfoCircleFilled } from '@ant-design/icons'
import { Tabs, Card, Typography, Button } from 'antd'
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
  const { recordList, getAllUsers, userList, loading, getAllRecords } = props

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
      <div>Stats Here</div>
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
              <Card className={commonStyles.card}>
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
  userList: state.admin.userList,
  loading: state.admin.loading,
})

const mapDispatchToProps = {
  getAllRecords,
  getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
