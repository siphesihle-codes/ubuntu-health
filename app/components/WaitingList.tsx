"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../api/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WaitingList = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.max(20, "Name must be 20 characters or less.")
				.required("Name is required."),
			email: Yup.string()
				.email("Invalid email address.")
				.required("E-Mail is required."),
		}),
		onSubmit: async (values) => {
			try {
				const docRef = await addDoc(collection(db, "WaitingList"), {
					name: values.name,
					email: values.email,
					signedUpAt: new Date(),
				});
				toast.success("Thank you for joining the waiting list!");
				formik.resetForm();
			} catch (err) {
				console.error(`Error adding document: ${err}.`);
				toast.error(`${err}.`);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="rounded-lg pb-20">
			<div id="waitlist" className="pt-20 md:flex">
				<div className="px-4 md:w-2/5">
					<div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[70vw]">
						<h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-4 py-6">
							Join Our Waiting List
						</h2>
						<p className="text-base text-body-color">
							Be the first to know when our EHR SAAS platform launches! Sign up
							below to receive exclusive updates and early access.
						</p>
					</div>
				</div>
				<div className="md:w-3/5 flex flex-col items-center justify-center">
					{/* Name */}
					<div className="mt-6">
						<label htmlFor="name" className="font-semibold text-md pb-2">
							Name
						</label>
						<div
							className="mt-2 pb-4 w-[18rem] md:w-[20rem] md:flex flex-col items-center justify-center"
						>
							<input
								type="text"
								name="name"
								id="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								placeholder="John Doe"
								className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500
              focus:border-blue-600 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
							/>
						</div>
					</div>
					{/* Email */}
					<div className="mt-6 mb-6">
						<label htmlFor="email" className="font-semibold text-md pb-2">
							Email
						</label>
						<div
							className="mt-2 pb-4 w-[18rem] md:w-[20rem] md:flex flex-col items-center
            justify-center"
						>
							<input
								type="email"
								name="email"
								id="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								placeholder="john.doe@email.com"
								className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500
              focus:border-blue-600 block flex-1 min-w-0 w-full text-smborder-gray-300 p-2.5"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="px-6 py-2 bg-gradient-to-r w-48 from-cyan-500 to-blue-500 rounded-md 
						text-sm font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
					>
						Join Waitlist
					</button>
				</div>
			</div>
		</form>
	);
};

export default WaitingList;
