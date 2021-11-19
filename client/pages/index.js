import { connect } from 'react-redux'

// UI
import FoodList from '../components/FoodList'
import commonStyles from './styles/common.module.css'

// Custom
import { updateFoodList } from '../redux/actions/user'

const Home = function (props) {
  const { updateFoodList } = props

  return (
    <div className={commonStyles.container}>
      <br />
      <FoodList />
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  updateFoodList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
