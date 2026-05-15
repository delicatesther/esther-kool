import React, { forwardRef } from "react";

const PreExportDraggableItem = ({ children, ...props }, ref) => {
	return (
		<button {...props} ref={ref}>
			{children}
		</button>
	);
};

export const DraggableItem = forwardRef(PreExportDraggableItem);
