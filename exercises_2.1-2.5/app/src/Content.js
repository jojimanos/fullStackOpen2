import Part from "./Part.js"

const Content = ({course}) => {
	return (
		<>
			{course.parts.map((part, index) => { return <Part key={index} part={part.name} exercise={part.exercises} /> })}
		</>
	)
}

export default Content
