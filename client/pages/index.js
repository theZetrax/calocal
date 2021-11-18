import { Button } from 'antd'

import { connect } from 'react-redux'
import { updateFoodList } from '../redux/actions/user'
import { useEffect } from 'react'

const Home = function (props) {
  const { foodList, updateFoodList } = props

  const handleClick = (e) => {
    e.preventDefault()
    updateFoodList()
  }

  useEffect(function () {
    console.log({
      foodList,
    })
  }, [])

  return (
    <div>
      <div>
        <Button type="primary" onClick={handleClick}>
          Click Me
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  foodList: state.user.foodList,
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = {
  updateFoodList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
