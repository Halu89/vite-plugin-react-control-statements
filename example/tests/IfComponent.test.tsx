import {FunctionComponent, useState} from "react";
import {Choose, If, Otherwise, When} from "vite-plugin-react-control-statements";
import {describe, expect, it, test} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const matcher = 'The if condition is true.';

describe('If component', () => {
	it('with basic use', async () => {
		render(<TestWrapper TestComponent={BasicUse}/>);

		expect(screen.queryAllByText(matcher)).toHaveLength(0);

		const toggle = screen.getByRole('button');
		await userEvent.click(toggle);
		expect(screen.getByText(matcher)).toBeTruthy();
	});

	test("directly returns an If component ", async () => {
		render(<TestWrapper TestComponent={ReturnIf}/>);
		expect(screen.queryAllByText(matcher)).toHaveLength(0);

		const toggle = screen.getByRole('button');
		await userEvent.click(toggle);
		expect(screen.getByText(matcher)).toBeTruthy();
	})


	test("JSX in variable", async () => {
		render(<TestWrapper TestComponent={JSXInVariable}/>);
		expect(screen.queryAllByText(matcher)).toHaveLength(0);

		const toggle = screen.getByRole('button');
		await userEvent.click(toggle);
		expect(screen.getByText(matcher)).toBeTruthy();
	});

	test.skip("nested use", async () => {
		render(<TestWrapper TestComponent={NestedUse}/>);
		expect(screen.queryAllByText(matcher)).toHaveLength(0);

		const toggle = screen.getByRole('button');
		await userEvent.click(toggle);
		expect(screen.getByText(matcher)).toBeTruthy();
	})

	test.skip("condition match regex", async () => {
		render(<ConditionMatchRegex/>);
		expect(screen.getByText(matcher)).toBeTruthy();
	});

	test.skip("JSX in string", async () => {
		render(<JSXInString/>);
		expect(screen.getByText("If")).toBeTruthy();
	});

});

const TestWrapper = ({TestComponent}: { TestComponent: FunctionComponent<{ condition: boolean }> }) => {
	const [ifTestValue, setIfTestValue] = useState(false);

	return (
			<>
				{/* On/Off toggle - also an example of a choose block*/}
				<button onClick={() => setIfTestValue((value) => !value)}>
					<Choose>
						<When condition={ifTestValue}>On</When>
						<Otherwise>Off</Otherwise>
					</Choose>
				</button>

				<TestComponent condition={ifTestValue}/>
			</>)
}

const BasicUse = ({condition}: { condition: boolean }) => {
	return (
			<>
				<If condition={condition}>
					{matcher}
				</If>
			</>
	)
}

const ReturnIf = ({condition}: { condition: boolean }) => {
	return (
			<If condition={condition}>
				{matcher}
			</If>
	)
}

const JSXInVariable = ({condition}: { condition: boolean }) => {
	const jsx = <If condition={condition}>
		{matcher}
	</If>;

	return (
			<>
				{jsx}
			</>
	)
}

const JSXInString = () => {
	const jsx = `<If condition={true}>
		{matcher}
	</If>`;

	return (
			<>
				{jsx}
			</>
	)
}

// region Non-passing tests
// These components do not compile to valid JSX.

// const NestedUse = ({condition}: { condition: boolean }) => {
// 	return (
// 			<>
// 				<If condition={condition}>
// 					<If condition={condition}>
// 						{matcher}
// 					</If>
// 				</If>
// 			</>
// 	)
// }

//
// const InArray = ({condition}: { condition: boolean }) => {
// 	return (<>
// 		{Array
// 			.from({length: 2})
// 			.map((_, index) => (
// 				<If key={index} condition={condition}>
// 					{matcher}
// 				</If>
// 			))
// 		}</>)
// }
//

// const ConditionMatchRegex = () => {
// 	return (
// 			<>
// 				<If condition={"}>".length > 2}>
// 					{matcher}
// 				</If>
// 			</>
// 	)
// }


// endregion
