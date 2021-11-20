import { useEffect } from 'react'
import { connect } from 'react-redux'

import { getRecordsByRecent } from '../redux/actions/user'
import FoodDetailCard from './FoodDetailCard'

const FoodListByRecent = (props) => {
  const { recordList, getRecordsByRecent } = props
  const arr = [1, 2, 3]

  useEffect(async () => {
    await getRecordsByRecent()
  }, [])

  return (
    <>
      {arr &&
        arr.map((ele, idx) => (
          <FoodDetailCard
            key={idx}
            name="Food Title"
            created_date={new Date()}
            id="1"
            price={300}
            calorie={1200}
          />
        ))}
    </>
  )
}

const mapStateToProps = (state) => ({
  recordList: state.user.recordList,
  loading: state.user.loading,
})

const mapDispatchToProps = {
  getRecordsByRecent,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListByRecent)
