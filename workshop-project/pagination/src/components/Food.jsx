const Food = ({name,image_url}) => {

  return (
    <div className="card">
      <div className="card-title">{name}</div>
      <div className="card-body">
        <div className="card-image">
          <img alt={name} src={image_url} />
        </div>
      </div>
    </div>
  )

}

export default Food