const Total = ({ course }) => {

	const sum = course.parts.reduce((total, amount) => { return total + amount.exercises }, 0)

	return (
		<>
			<p>Number of exercises {sum}</p>
		</>
	)
}

export default Total;
