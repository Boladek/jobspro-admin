import PropTypes from "prop-types";
import {
	getCountries,
	getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";

export const CountrySelect = ({ value, onChange, labels, ...rest }) => (
	<select
		{...rest}
		value={value}
		onChange={(event) => onChange(event.target.value || undefined)}
	>
		<option value="">{labels["ZZ"]}</option>
		{getCountries().map((country) => (
			<option key={country} value={country}>
				{labels[country]} +{getCountryCallingCode(country)}
			</option>
		))}
	</select>
);

CountrySelect.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	labels: PropTypes.objectOf(PropTypes.string).isRequired,
};

/*
const [country, setCountry] = useState()

<CountrySelect
  labels={en}
  value={country}
  onChange={setCountry}/>
*/
