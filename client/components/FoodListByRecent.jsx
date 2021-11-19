import FoodDetailCard from './FoodDetailCard'

const FoodListByRecent = () => {
  const arr = [1, 2, 3]

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

export default FoodListByRecent
