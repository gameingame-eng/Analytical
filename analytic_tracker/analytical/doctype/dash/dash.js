// Copyright (c) 2026, Lakshya Dusanapudi && Saivarshan Prabhakaran and contributors
// For license information, please see license.txt

frappe.ui.form.on("Dash", {
	refresh(frm) {
		frm.add_custom_button(__("Dashboard Builder"), () => {
			frappe.set_route("analytics-dashboard-builder");
		});
	},
});
