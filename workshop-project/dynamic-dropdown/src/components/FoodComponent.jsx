const FoodComponent = ({menu,foodName,image_url}) => {

  return (
    <div className="single-food">
      <h2>{foodName}</h2>
      <img alt={foodName} src={image_url} />
    </div>
  )

}

export default FoodComponent