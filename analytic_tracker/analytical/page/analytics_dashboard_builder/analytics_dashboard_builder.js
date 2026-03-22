frappe.pages["analytics-dashboard-builder"].on_page_load = function (wrapper) {
	const open_dashboards = () => frappe.new_doc("Dash");
	const open_dash_list = () => frappe.set_route("List", "Dash");

	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Analytics Dashboard Builder"),
		single_column: true,
	});

	page.set_primary_action(__("New Dashboard"), open_dashboards);
	page.add_action_item(__("View Dashboards"), open_dash_list);
	page.set_secondary_action(__("Dashboard Charts"), () => frappe.set_route("List", "Dashboard Chart"));

	frappe.breadcrumbs.add("Analytical");

	const $body = page.body.addClass("no-border analytical-page-body");
	$body.empty().append(frappe.render_template("analytics_dashboard_builder"));

	const actions = {
		".js-new-dashboard": open_dashboards,
		".js-open-charts": () => frappe.set_route("List", "Dashboard Chart"),
		".js-open-reports": () => frappe.set_route("List", "Report"),
		".js-open-pages": () => frappe.set_route("List", "Page"),
	};

	Object.entries(actions).forEach(([selector, handler]) => {
		$body.find(selector).on("click", handler);
	});
};
