import {If} from "vite-plugin-react-control-statements";

export const NestedUse = ({condition}: { condition: boolean }) => {
	return (
			<>
				<If condition={condition}>
					<If condition={condition}>
						<>Hello</>
					</If>
				</If>
			</>
	)
}
