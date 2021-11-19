import { Space, DatePicker } from 'antd'
import moment from 'moment'

import FoodDetailCard from './FoodDetailCard'

const { RangePicker } = DatePicker

const defaultRanges = {
  'This Week': [moment().startOf('week'), moment()],
  'This Month': [moment().startOf('month'), moment()],
}

const arr = [1, 2, 3]

const FoodListByRange = () => (
  <div>
    <RangePicker ranges={defaultRanges} style={{ marginBottom: '16px' }} />
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
  </div>
)

export default FoodListByRange
