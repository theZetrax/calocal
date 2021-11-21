// UI
import FoodList from '../components/FoodList'
import commonStyles from './styles/common.module.css'

const Home = function (props) {
  return (
    <div className={commonStyles.container}>
      <br />
      <FoodList />
    </div>
  )
}

export default Home
