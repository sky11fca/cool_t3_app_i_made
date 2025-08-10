import "../../styles/ultimateglitchstatus/style.css"

export default function Grid() {
  return(
    <div className="Table">
      {Array.from({length: 50}).map((_, i) => (
        <div
          key={"key" + i}
          className="Cell"
          title={i.toString()}
        ></div>
      ))}
    </div>
  )
}