import React from "react";
import PropTypes from "prop-types";

export function ReUsableTable({ columns, data }) {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column}>{column}</th>
					))}
				</tr>
			</thead>

			<tbody>
				{data.map((row, index) => (
					<Row key={index} row={row} />
				))}
			</tbody>
		</table>
	);
}

function Row({ row }) {
	return <tr></tr>;
}

ReUsableTable.propTypes = {
	columns: PropTypes.string,
	data: PropTypes.bool,
};
