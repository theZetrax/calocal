import { InfoCircleTwoTone } from '@ant-design/icons'
import { Card, Space } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// UI
import FoodList from '../components/FoodList'
import commonStyles from './styles/common.module.css'

const Home = function (props) {
  const { accountInformation } = props
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log({
      accountInformation,
    })
    if (typeof accountInformation === 'undefined') return
    setLoading(false)
  }, [accountInformation])

  return (
    <div className={commonStyles.container}>
      <Space direction="vertical" style={{ minWidth: '100%', width: '100%' }}>
        {loading ? (
          <div>
            <InfoCircleTwoTone /> Loading Please Wait...
          </div>
        ) : (
          <Card loading={loading}>
            <Title level={4}>Account Summary</Title>
            <p
              style={{
                color: accountInformation.caloriesLeftToday < 0 && 'red',
              }}
            >
              Calories Left Today:{' '}
              <b>
                {accountInformation.caloriesLeftToday} /{' '}
                {accountInformation.calorieLimit}
              </b>
            </p>
            <p
              style={{
                color:
                  accountInformation.totalMonthExpense >
                    accountInformation.monthlyExpenseLimit && 'red',
              }}
            >
              Monthly Expense:{' '}
              <b>
                {accountInformation.totalMonthExpense} /{' '}
                {accountInformation.monthlyExpenseLimit}
              </b>
            </p>
            <p>
              Average Daily Calorie Intake This Week:{' '}
              <b>{accountInformation.averageCalories || 0}</b>
            </p>
          </Card>
        )}
        <FoodList />
      </Space>
    </div>
  )
}

const mapStateToProps = (state) => ({
  accountInformation: state.user.accountInformation,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
