import React from "react";
import DashboardNav from "./DashboardNav";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex h-screen bg-gray-50 text-gray-800">
			<div className="w-1/6 h-full">
				<DashboardNav />
			</div>
			<div className="w-5/6 h-h-full overflow-y-auto bg-inherit text-inherit">
				{children}
			</div>
		</div>
	);
};

export default Layout;
