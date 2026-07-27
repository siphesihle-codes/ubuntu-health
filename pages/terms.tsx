import Link from "next/link";
import React from "react";
import Legal, {
	LegalList,
	LegalMail,
	LegalSection,
} from "@/components/Legal";
import {
	LEGAL,
	SALES_EMAIL,
	SUBSCRIPTION_PLANS,
	SUPPORT_EMAIL,
	TRIAL_LENGTH_DAYS,
} from "@/types";

const planSummary = SUBSCRIPTION_PLANS.map(
	(plan) =>
		`${plan.name}: up to ${plan.practitioners} practitioner${
			plan.practitioners === 1 ? "" : "s"
		}, R${plan.price.toLocaleString("en-ZA")} per month.`
);

const TermsPage = () => (
	<Legal
		title="Terms of Service"
		description="The agreement between your practice and Ubuntu Health."
	>
		<LegalSection heading="1. Who we are">
			<p>
				Ubuntu Health is operated by {LEGAL.entity} (registration number{" "}
				{LEGAL.registrationNumber}), {LEGAL.address}. You can reach us at{" "}
				<LegalMail address={SUPPORT_EMAIL} />.
			</p>
			<p>
				These terms apply to your practice&apos;s use of the Ubuntu Health web
				application and API, which we call the service. By creating a practice
				or using the service, you accept them. If you accept on behalf of a
				practice, you confirm that you are authorised to bind that practice.
			</p>
		</LegalSection>

		<LegalSection heading="2. What the service does, and what it does not do">
			<p>
				Ubuntu Health is record keeping software. It stores patients,
				appointments, clinical notes, prescriptions and invoices, kept separate
				for each practice.
			</p>
			<p>
				It is not a medical device and it does not practise medicine. It gives
				no clinical advice and performs no clinical checking: it does not screen
				prescriptions for interactions, contraindications, allergies or dosage
				errors, and it does not validate diagnosis codes. Every clinical
				decision, and the accuracy of every entry in a patient record, remains
				the responsibility of the registered practitioner who makes it. Your
				practice remains responsible for complying with the Health Professions
				Act, the ethical rules of the HPCSA and the National Health Act.
			</p>
			<p>
				The service is under active development. Some capabilities described on
				our website are still being built, and we will not charge you for a plan
				on the basis of a feature we have not delivered.
			</p>
		</LegalSection>

		<LegalSection heading="3. Accounts, practitioners and staff">
			<p>
				The person who registers a practice becomes its administrator and can
				invite colleagues by generating an invitation link. Your practice is
				responsible for:
			</p>
			<LegalList
				items={[
					"Giving accurate registration details, including the HPCSA registration number of each practitioner.",
					"Keeping passwords, invitation links and password reset links confidential. Each of those links grants access to patient records, so treat them as credentials.",
					"Everything done under your practice's accounts.",
					"Deactivating staff who leave the practice, promptly.",
				]}
			/>
			<p>
				We may suspend an account that we reasonably believe has been
				compromised, or is being used unlawfully.
			</p>
		</LegalSection>

		<LegalSection heading={`4. The ${TRIAL_LENGTH_DAYS} day free trial`}>
			<p>
				Every new practice starts on a free trial of {TRIAL_LENGTH_DAYS} days
				from registration, with full access and without a card.
			</p>
			<p>
				When the trial ends, the practice moves to read only mode, described in
				section 6. We never charge you automatically at the end of a trial,
				because we do not hold your card details.
			</p>
		</LegalSection>

		<LegalSection heading="5. Plans, seats and fees">
			<p>
				Plans are priced per practitioner seat, per month. A seat is taken by
				any user holding the doctor or administrator role, being the roles that
				can prescribe. Reception and nursing users are unlimited on every plan.
			</p>
			<LegalList items={planSummary} />
			<p>
				If your practice is larger than our published plans, contact{" "}
				<LegalMail address={SALES_EMAIL} />.
			</p>
			<p>
				Fees are quoted in South African Rand and are payable monthly in
				advance. Published prices exclude VAT unless we state otherwise. We
				invoice your practice directly and we do not store card details.
			</p>
			<p>
				You may move to a larger plan at any time, and the extra seats become
				available immediately. To move to a smaller plan you must first remove
				or deactivate practitioners so that the number in use fits within the
				smaller plan.
			</p>
		</LegalSection>

		<LegalSection heading="6. Read only mode">
			<p>
				We place a practice into read only mode when its trial ends without a
				plan being confirmed, or when an invoice remains unpaid after we have
				given you notice.
			</p>
			<p>
				In read only mode you and your team can still sign in, view every record
				and export everything. What you cannot do is create or change records
				until a plan is active. We handle it this way, rather than locking you
				out, because the records are your practice&apos;s and you have a legal
				duty to retain them.
			</p>
		</LegalSection>

		<LegalSection heading="7. Cancelling">
			<p>
				You may cancel at any time by contacting us. Cancellation takes effect
				at the end of the month you have paid for, and we do not refund part
				months.
			</p>
			<p>
				Export your records before you cancel. We keep your data for{" "}
				{LEGAL.retentionDays} days after cancellation so that you can still
				request an export, and we then delete it.
			</p>
		</LegalSection>

		<LegalSection heading="8. Your data stays yours">
			<p>
				Your practice owns everything it captures in the service. Under the
				Protection of Personal Information Act, your practice is the responsible
				party for its patient records and we act as your operator: we process
				those records only to run the service for you and on your instruction.
			</p>
			<p>
				We do not sell practice or patient data, we do not share it with
				advertisers, and we do not use it to train machine learning models. Our{" "}
				<Link
					href="/policy"
					className="text-foreground underline-offset-4 hover:underline"
				>
					Privacy Policy
				</Link>{" "}
				sets out what we collect and how we protect it.
			</p>
			<p>
				Any administrator can export the practice&apos;s full record set as a
				JSON file from the Billing page, at any time, including while in read
				only mode.
			</p>
		</LegalSection>

		<LegalSection heading="9. Acceptable use">
			<p>You agree not to:</p>
			<LegalList
				items={[
					"Use the service unlawfully, or for anything other than running your practice.",
					"Attempt to reach another practice's data, or to bypass the tenant, role or plan checks.",
					"Probe, scan or load test the service without our written permission.",
					"Upload malicious code, or anything intended to disrupt the service.",
					"Share access with anyone outside your practice, or resell the service.",
					"Copy, reverse engineer or build a competing product from the service.",
				]}
			/>
		</LegalSection>

		<LegalSection heading="10. Availability and changes to the service">
			<p>
				We host the service and aim to keep it available, but we do not promise
				uninterrupted access and we may take it offline for maintenance. We may
				add, change or remove features. Where a change materially reduces what
				your plan does, we will tell practice administrators before it takes
				effect.
			</p>
		</LegalSection>

		<LegalSection heading="11. Our liability">
			<p>
				Nothing in these terms limits liability that cannot be limited by law,
				including liability for death or personal injury caused by our
				negligence, or for fraud, and nothing limits any rights you have under
				the Consumer Protection Act where it applies to you.
			</p>
			<p>Subject to that, we are not liable for:</p>
			<LegalList
				items={[
					"Clinical decisions, diagnoses, prescriptions or treatment.",
					"The accuracy or completeness of the information your team records.",
					"Indirect or consequential loss, including lost profit, lost patients or loss of goodwill.",
				]}
			/>
			<p>
				Our total liability in any twelve month period is limited to the fees
				your practice paid us in the twelve months before the claim arose. We
				keep backups, but you remain responsible for exporting and retaining
				your own copy of your records.
			</p>
		</LegalSection>

		<LegalSection heading="12. Indemnity">
			<p>
				You indemnify us against claims arising from your practice&apos;s use of
				the service in breach of these terms or of any law, including claims by
				patients concerning records your team captured.
			</p>
		</LegalSection>

		<LegalSection heading="13. Changes to these terms">
			<p>
				We may update these terms. We will publish the new version on this page
				with a new last updated date and, for material changes, notify practice
				administrators. Continuing to use the service after a change means you
				accept it.
			</p>
		</LegalSection>

		<LegalSection heading="14. Governing law">
			<p>
				These terms are governed by the law of the Republic of South Africa, and
				the South African courts have jurisdiction. We would rather resolve
				problems directly, so please contact us at{" "}
				<LegalMail address={SUPPORT_EMAIL} /> first.
			</p>
		</LegalSection>

		<LegalSection heading="15. Contact">
			<p>
				{LEGAL.entity}, {LEGAL.address}. Support:{" "}
				<LegalMail address={SUPPORT_EMAIL} />. Sales:{" "}
				<LegalMail address={SALES_EMAIL} />.
			</p>
		</LegalSection>
	</Legal>
);

export default TermsPage;
