import { BaseButton } from "../../../component/button";
import { Footer } from "../../../component/footer";
import { Header } from "../../../component/header";
import { colors } from "../../../helpers/theme";
import { UserPictureSection } from "./user-picture-section";
import { ShortBioSection } from "./short-bio-section";
import { ExperienceComponent } from "./experience-component";
import { EducationExperienceSection } from "./education-component-section";
import { OtherSection } from "./others-section";

function ReviewProfilePage() {
	return (
		<div className="flex w-full flex-col h-screen">
			<Header />
			<div className="flex-1 p-4">
				<div className="max-w-4xl mx-auto w-full md:border border-blue-400 rounded-xl p-2 md:p-6">
					<div className="flex justify-between mb-4">
						<div className="flex-1">
							<p className="text-[#206DB0] text-2xl font-bold">
								Review Profile
							</p>
							<p className="text-xs text-gray-700">
								More information should be placed here
							</p>
						</div>
						<div className="w-1/3 hidden sm:block">
							<div className="w-full">
								<BaseButton>Submit</BaseButton>
							</div>
						</div>
					</div>
					<div className="block md:flex gap-4">
						<div>
							<UserPictureSection />
						</div>
						<div className="flex-1">
							<div className="mb-4">
								<ShortBioSection />
							</div>
							<div className="block sm:flex gap-2">
								<div className="w-full md:w-1/2">
									<div>
										<OtherSection title="Industry/Specialization">
											<div className="flex gap-2">
												{["hospitality", "events", "home Repairs"].map(
													(text) => (
														<div
															key={text}
															className={`py-1 px-2 border border-[${colors.primary}] text-[${colors.primary}] text-xs rounded-full items-center font-bold bg-blue-50`}
														>
															<span>{text}</span>
														</div>
													)
												)}
											</div>
										</OtherSection>
									</div>
									<div>
										<OtherSection title="Working Rate">
											<div>
												<p className="text-lg font-bold">N2000</p>
												<p className="text-xs text-gray-500">Daily</p>
											</div>
										</OtherSection>
									</div>
									<div>
										<OtherSection title="Services">
											<div className="flex gap-2">
												{["hospitality", "events", "home Repairs"].map(
													(text) => (
														<div
															key={text}
															className={`py-1 px-2 border border-[${colors.primary}] text-[${colors.primary}] text-xs rounded-full items-center font-bold bg-blue-50`}
														>
															<span>{text}</span>
														</div>
													)
												)}
											</div>
										</OtherSection>
									</div>
									<div>
										<OtherSection title="Skills">
											<div className="flex gap-2">
												{["hospitality", "events", "home Repairs"].map(
													(text) => (
														<div
															key={text}
															className={`py-1 px-2 border border-[${colors.primary}] text-[${colors.primary}] text-xs rounded-full items-center font-bold bg-blue-50`}
														>
															<span>{text}</span>
														</div>
													)
												)}
											</div>
										</OtherSection>
									</div>
								</div>
								<div className="w-full md:w-1/2">
									<div>
										<ExperienceComponent />
									</div>
									<div>
										<EducationExperienceSection />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="block sm:hidden">
					<div className="w-full">
						<BaseButton>Submit</BaseButton>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ReviewProfilePage;
