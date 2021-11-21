import axios from 'axios'
import { useState } from 'react'
import commonStyles from '../styles/common.module.css'

const MainPage = () => {
  // Load all food enteries
  useState(async () => {
    try {
      await axios('/admin/users/1/records/1')
    } catch (err) {
      console.error('Failed to load all food enteries', {
        err,
      })
    }
  }, [])

  return <div className={commonStyles.container}></div>
}

export default MainPage
