const Total = ({course}) => {

	let sum = 0

	function total() {
		course.parts.forEach(part => {
			sum = sum + part.exercises
		})
	}

	total()

	return (
		<>
			<p>Number of exercises {sum}</p>
		</>
	)
}

export default Total;
