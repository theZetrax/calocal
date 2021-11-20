import { connect } from 'react-redux'

import styles from './FoodListByRecent.module.css'
import FoodDetailCard from './FoodDetailCard'
import LoadingComponent from './LoadingComponent'

const FoodListByRecent = (props) => {
  const { recordList, loading } = props

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <LoadingComponent />
      </div>
    )

  return (
    <>
      {recordList &&
        recordList.map((record) => (
          <FoodDetailCard
            key={record.id}
            name={record.name}
            created_date={new Date(record.created_at)}
            id={record.id}
            price={record.price}
            calorie={record.calories}
          />
        ))}
    </>
  )
}

const mapStateToProps = (state) => ({
  recordList: state.user.recordList,
  loading: state.user.loading,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListByRecent)
