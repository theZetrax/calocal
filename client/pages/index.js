import { connect } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

// UI
import { Button } from 'antd'

// Custom
import { updateFoodList } from '../redux/actions/user'
import { GetAuthToken, USER_TOKEN } from '../lib/auth'
// UI
import NavBar from '../components/NavBar'

const Home = function (props) {
  const { foodList, updateFoodList } = props

  const handleClick = (e) => {
    e.preventDefault()
    updateFoodList()
    console.log({
      token: localStorage.getItem(USER_TOKEN),
    })
  }

  useEffect(async function () {
    try {
      const response = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${GetAuthToken()}`,
        },
      })

      console.log({
        response,
      })
    } catch (err) {
      console.log('Loading error', {
        err,
      })
    }
  }, [])

  return (
    <>
      <NavBar />
    </>
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
