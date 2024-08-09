import { formatDate } from "../../../helpers/function";
import { EditIcon } from "../../../assets/edit-icon";

export function TaxInformationPage() {
	return (
		<div className="p-2">
			<p className="text-lg font-bold">Tax Information</p>
			<p className="text-xs font-extralight mb-4">
				This information is required in order to confirm if you are a U.S. or
				non-U.S. taxpayer and whether or not Upwork is required to withhold
				taxes from your earnings. Add your tax information now to avoid delays
				in getting paid.
			</p>
			<div className="p-4 bg-light rounded-lg">
				<div className="flex justify-between items-start mb-4 gap-4">
					<div>
						<p className="font-bold text-sm">Taxpayer identification</p>
						<p className="text-xs font-extralight">
							Our taxpayer identification information will be included as an
							Upwork W-9 or W-8 series substitute form
						</p>
					</div>
					<EditIcon />
				</div>
				<div className="mb-4">
					<p className="font-bold text-sm">Legal name of taxpayer</p>
					<p className="text-xs font-extralight">Ademola Adewale</p>
				</div>
				<div className="mb-4">
					<p className="font-bold text-sm">Federal tax classification</p>
					<p className="text-xs font-extralight">Individual</p>
				</div>
				<div className="mb-4">
					<p className="font-bold text-sm">Country of citizenship</p>
					<p className="text-xs font-extralight">Nigeria</p>
				</div>
				<div>
					<p className="font-bold text-sm">Date of birth</p>
					<p className="text-xs font-extralight">{formatDate(new Date())}</p>
				</div>
			</div>
			<br />
			<div className="p-4 bg-light rounded-lg">
				<div className="flex justify-between items-start mb-4 gap-4">
					<p className="font-bold text-sm">Tax Residence</p>
					<EditIcon />
				</div>
				<p className="font-bold text-sm">Legal name of taxpayer</p>
				<p className="text-xs font-extralight">Ademola Adewale</p>
				<p className="text-xs font-extralight">Individual</p>
				<p className="text-xs font-extralight">Nigeria</p>
				<p className="text-xs font-extralight">{formatDate(new Date())}</p>
			</div>
			<br />
			<div className="p-4 bg-light rounded-lg">
				<div className="flex justify-between items-start mb-4 gap-4">
					<p className="font-bold text-sm">Taxpayer Residence</p>

					<EditIcon />
				</div>
				<div className="mb-4">
					<p className="font-bold text-sm">Tax identification number</p>
					<p className="text-xs font-extralight">
						Please provide your tax identification number (TIN). If you don’t
						have a TIN, consult a local tax professional or your tax advisor.
						For more details, read our help article.
					</p>
				</div>
			</div>
			<br />
		</div>
	);
}
